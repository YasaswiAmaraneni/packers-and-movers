import React from 'react';
import ItemsList from './ItemsList';

function MoveDetails({ move, onEditSection }) {
  if (!move) return null;

  // Extract house details with safe fallbacks
  const oldFloor = move.old_floor_no !== undefined && move.old_floor_no !== null ? move.old_floor_no : 'N/A';
  const oldElevator = move.old_elevator_availability || 'No';
  const oldDistance = move.old_parking_distance || '0 meters';

  const newFloor = move.new_floor_no !== undefined && move.new_floor_no !== null ? move.new_floor_no : 'N/A';
  const newElevator = move.new_elevator_availability || 'No';
  const newDistance = move.new_parking_distance || '0 meters';

  const additionalInfo =
    move.old_house_additional_info ||
    move.new_house_additional_info ||
    'Test Data';

  return (
    <div className="move-expanded-details" id={`details-${move.estimate_id}`}>
      {/* 1. Additional Information Section */}
      <section className="details-section additional-info-section">
        <div className="section-header-row">
          <h3 className="section-title">Additional Information</h3>
          <button
            type="button"
            className="btn-black-action"
            onClick={() => onEditSection && onEditSection('additional-info', move)}
            aria-label="Edit Additional Info"
          >
            Edit Additional Info
          </button>
        </div>
        <p className="additional-info-text">{additionalInfo}</p>
      </section>

      {/* 2. House Details Section */}
      <section className="details-section house-details-section">
        <div className="section-header-row">
          <h3 className="section-title">House Details</h3>
          <button
            type="button"
            className="btn-black-action"
            onClick={() => onEditSection && onEditSection('house-details', move)}
            aria-label="Edit House Details"
          >
            Edit House Details
          </button>
        </div>

        {/* Existing House Details */}
        <div className="house-sub-section">
          <h4 className="house-sub-heading">Existing House Details</h4>
          <div className="house-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Floor No.</span>
              <span className="spec-value">{oldFloor}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Elevator Available.</span>
              <span className="spec-value">{oldElevator}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Distance from Elevator / Staircase to truck</span>
              <span className="spec-value">{oldDistance}</span>
            </div>
          </div>
        </div>

        {/* New House Details */}
        <div className="house-sub-section">
          <h4 className="house-sub-heading">New House Details</h4>
          <div className="house-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Floor No.</span>
              <span className="spec-value">{newFloor}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Elevator Available.</span>
              <span className="spec-value">{newElevator}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Distance from Elevator / Staircase to truck</span>
              <span className="spec-value">{newDistance}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Inventory Details Section */}
      <section className="details-section inventory-details-section">
        <div className="section-header-row">
          <h3 className="section-title">Inventory Details</h3>
          <button
            type="button"
            className="btn-black-action"
            onClick={() => onEditSection && onEditSection('inventory', move)}
            aria-label="Edit Inventory"
          >
            Edit Inventory
          </button>
        </div>

        {/* Interactive Inventory Accordion */}
        <ItemsList itemsData={move.items} />
      </section>
    </div>
  );
}

export default MoveDetails;
