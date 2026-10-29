import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  calculateInventoryCount,
  calculateCustomItemsCount,
  getActiveItemsForCategory,
} from '../utils/formatters';

function ItemsList({ itemsData }) {
  // Store expanded accordion section IDs (e.g. 'inv-1', 'custom-items')
  // We can default the first inventory item to expanded or allow toggle
  const [expandedSections, setExpandedSections] = useState({
    'inv-1': true, // Keep first inventory section expanded initially for great UX
  });

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (!itemsData) {
    return <p className="no-items-text">No inventory details available.</p>;
  }

  const { inventory = [], customItems } = itemsData;
  const hasCustomItems =
    customItems && Array.isArray(customItems.items) && customItems.items.length > 0;

  return (
    <div className="inventory-accordion-wrapper">
      {/* Standard Inventory Groups */}
      {inventory.map((invGroup) => {
        const sectionId = `inv-${invGroup.id || invGroup.name}`;
        const isExpanded = !!expandedSections[sectionId];
        const count = calculateInventoryCount(invGroup);

        // Filter subcategories that contain active items (or fallback to all if none have qty)
        const categoriesWithItems = (invGroup.category || []).map((cat) => ({
          ...cat,
          activeItems: getActiveItemsForCategory(cat),
        })).filter((cat) => cat.activeItems.length > 0);

        return (
          <div key={sectionId} className="inventory-accordion-item">
            {/* Category Header Bar */}
            <button
              type="button"
              className={`inventory-header-bar ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleSection(sectionId)}
              aria-expanded={isExpanded}
            >
              <div className="inventory-header-left">
                <span className="inventory-group-title">
                  {invGroup.displayName || invGroup.name}
                </span>
                <span className="inventory-count-badge">{count}</span>
              </div>
              <div className="inventory-header-right">
                {isExpanded ? (
                  <FaChevronUp className="accordion-chevron-icon" />
                ) : (
                  <FaChevronDown className="accordion-chevron-icon" />
                )}
              </div>
            </button>

            {/* Expanded Content: Subcategories and items grid */}
            {isExpanded && (
              <div className="inventory-content-panel">
                {categoriesWithItems.length > 0 ? (
                  <div className="subcategories-grid">
                    {categoriesWithItems.map((cat) => (
                      <div key={cat.id || cat.name} className="subcategory-column">
                        <h5 className="subcategory-title">{cat.displayName || cat.name}</h5>
                        <ul className="items-list">
                          {cat.activeItems.map((item, idx) => (
                            <li key={item.id || idx} className="item-row">
                              <div className="item-info">
                                <span className="item-name">{item.displayName}</span>
                                {item.variation && (
                                  <span className="item-variation">{item.variation}</span>
                                )}
                              </div>
                              <span className="item-qty">{item.qty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-category-msg">
                    No items selected in this category for this move.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Custom Items Section */}
      {hasCustomItems && (
        <div className="inventory-accordion-item">
          <button
            type="button"
            className={`inventory-header-bar ${expandedSections['custom-items'] ? 'expanded' : ''}`}
            onClick={() => toggleSection('custom-items')}
            aria-expanded={!!expandedSections['custom-items']}
          >
            <div className="inventory-header-left">
              <span className="inventory-group-title">Custom Items</span>
              <span className="inventory-count-badge">
                {calculateCustomItemsCount(customItems)}
              </span>
            </div>
            <div className="inventory-header-right">
              {expandedSections['custom-items'] ? (
                <FaChevronUp className="accordion-chevron-icon" />
              ) : (
                <FaChevronDown className="accordion-chevron-icon" />
              )}
            </div>
          </button>

          {expandedSections['custom-items'] && (
            <div className="inventory-content-panel">
              <div className="subcategories-grid">
                <div className="subcategory-column custom-items-column">
                  <h5 className="subcategory-title">Custom Items</h5>
                  <ul className="items-list">
                    {customItems.items.map((cItem, idx) => {
                      const units = customItems.units || 'ft';
                      const dims =
                        cItem.item_length || cItem.item_width || cItem.item_height
                          ? `Dimensions: ${cItem.item_length || 0}L x ${cItem.item_width || 0}W x ${cItem.item_height || 0}H ${units}`
                          : '';
                      const desc = cItem.item_description
                        ? dims
                          ? `${cItem.item_description} (${dims})`
                          : cItem.item_description
                        : dims;

                      return (
                        <li key={cItem.id || idx} className="item-row">
                          <div className="item-info">
                            <span className="item-name">
                              {cItem.item_name || 'Custom Item'}
                            </span>
                            {desc && <span className="item-variation">{desc}</span>}
                          </div>
                          <span className="item-qty">{cItem.item_qty || 1}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemsList;
