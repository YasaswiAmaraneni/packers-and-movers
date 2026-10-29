/**
 * Utility helper functions for Packers and Movers Move Tracker
 */

/**
 * Format date string (e.g., '2021-11-06 22:00:00') to 'Nov 06, 2021 at 10:00 pm'
 * Matches the reference screenshots format: 'Sep 26, 2020 at 6:18 pm'
 */
export function formatMoveDate(dateStr) {
  if (!dateStr) return 'Date not specified';
  try {
    const safeStr = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
    const dateObj = new Date(safeStr);
    if (isNaN(dateObj.getTime())) {
      return dateStr;
    }

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour is 12 am
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${month} ${formattedDay}, ${year} at ${hours}:${formattedMinutes} ${ampm}`;
  } catch (e) {
    return dateStr;
  }
}

/**
 * Extract active / selected variations (type, size) for an item
 * e.g., ['Wooden'], ['2 Piece'], ['Glass, Dismantlable'], ['XXL']
 */
export function getItemVariations(item) {
  if (!item) return '';
  const variations = [];

  // Check item.type
  if (Array.isArray(item.type)) {
    item.type.forEach((t) => {
      if (t && (t.selected || t.selected === true || t.selected === 'true')) {
        const opt = (t.option || '').trim();
        if (opt) variations.push(opt);
      }
    });
  }

  // Check item.size
  if (Array.isArray(item.size)) {
    item.size.forEach((s) => {
      if (s && (s.selected || s.selected === true || s.selected === 'true')) {
        const opt = (s.tooltip || s.option || '').trim();
        if (opt) variations.push(opt);
      }
    });
  }

  // Fallback to typeOptions if nothing selected but typeOptions exists
  if (variations.length === 0 && item.typeOptions && typeof item.typeOptions === 'string') {
    // If single type option is given without options list
    if (!item.typeOptions.includes(',')) {
      variations.push(item.typeOptions.trim());
    }
  }

  return variations.join(', ');
}

/**
 * Calculate total quantity for a given inventory category group (e.g. Furniture)
 */
export function calculateInventoryCount(invGroup) {
  if (!invGroup || !Array.isArray(invGroup.category)) return 0;
  let count = 0;

  invGroup.category.forEach((cat) => {
    if (Array.isArray(cat.items)) {
      cat.items.forEach((item) => {
        const q = Number(item.qty) || 0;
        count += q;
        if (Array.isArray(item.childItems)) {
          item.childItems.forEach((ci) => {
            count += Number(ci.qty) || 0;
          });
        }
      });
    }
  });

  return count;
}

/**
 * Calculate total count for custom items
 */
export function calculateCustomItemsCount(customItems) {
  if (!customItems || !Array.isArray(customItems.items)) return 0;
  return customItems.items.length;
}

/**
 * Get items list with quantity > 0 for a subcategory
 */
export function getActiveItemsForCategory(category) {
  if (!category || !Array.isArray(category.items)) return [];
  const activeItems = [];

  category.items.forEach((item) => {
    const parentQty = Number(item.qty) || 0;
    const hasChildItems = Array.isArray(item.childItems) && item.childItems.length > 0;

    if (parentQty > 0) {
      activeItems.push({
        id: item.id || item.uniquieId || Math.random().toString(),
        displayName: item.displayName || item.name,
        qty: parentQty,
        variation: getItemVariations(item),
      });
    }

    if (hasChildItems) {
      item.childItems.forEach((child, idx) => {
        const childQty = Number(child.qty) || 0;
        if (childQty > 0) {
          activeItems.push({
            id: child.id || `${item.id}-child-${idx}`,
            displayName: child.displayName || item.displayName || child.name,
            qty: childQty,
            variation: getItemVariations(child) || getItemVariations(item),
          });
        }
      });
    }
  });

  return activeItems;
}
