import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function EditModal({ modalData, onClose, onSave }) {
  if (!modalData) return null;

  const { type, move } = modalData;

  const [additionalInfo, setAdditionalInfo] = useState(
    move.old_house_additional_info || move.new_house_additional_info || 'Test Data'
  );
  const [oldFloor, setOldFloor] = useState(move.old_floor_no || '4');
  const [newFloor, setNewFloor] = useState(move.new_floor_no || '4');
  const [oldElevator, setOldElevator] = useState(move.old_elevator_availability || 'Yes');
  const [newElevator, setNewElevator] = useState(move.new_elevator_availability || 'Yes');
  const [oldDistance, setOldDistance] = useState(move.old_parking_distance || '242 feet');
  const [newDistance, setNewDistance] = useState(move.new_parking_distance || '242 feet');
  const [movingDate, setMovingDate] = useState(
    move.moving_on ? move.moving_on.substring(0, 10) : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMove = { ...move };

    if (type === 'additional-info') {
      updatedMove.old_house_additional_info = additionalInfo;
    } else if (type === 'house-details') {
      updatedMove.old_floor_no = oldFloor;
      updatedMove.new_floor_no = newFloor;
      updatedMove.old_elevator_availability = oldElevator;
      updatedMove.new_elevator_availability = newElevator;
      updatedMove.old_parking_distance = oldDistance;
      updatedMove.new_parking_distance = newDistance;
    } else if (type === 'moving-date') {
      updatedMove.moving_on = `${movingDate} 18:00:00`;
    }

    if (onSave) onSave(updatedMove);
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'additional-info':
        return 'Edit Additional Information';
      case 'house-details':
        return 'Edit House Details';
      case 'inventory':
        return 'Edit Inventory Items';
      case 'moving-date':
        return 'Update Move Date';
      default:
        return 'Edit Move Details';
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{getTitle()}</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {type === 'additional-info' && (
            <div className="form-group">
              <label htmlFor="additionalInfo" className="form-label">
                Additional Notes / Instructions:
              </label>
              <textarea
                id="additionalInfo"
                className="form-textarea"
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter any additional moving instructions..."
              />
            </div>
          )}

          {type === 'house-details' && (
            <div className="form-sections-vertical">
              <div className="form-sub-block">
                <h4 className="form-sub-title">Existing House</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Floor No.</label>
                    <input
                      type="text"
                      className="form-input"
                      value={oldFloor}
                      onChange={(e) => setOldFloor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Elevator Available?</label>
                    <select
                      className="form-select"
                      value={oldElevator}
                      onChange={(e) => setOldElevator(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Distance to Truck</label>
                    <input
                      type="text"
                      className="form-input"
                      value={oldDistance}
                      onChange={(e) => setOldDistance(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-sub-block">
                <h4 className="form-sub-title">New House</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Floor No.</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newFloor}
                      onChange={(e) => setNewFloor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Elevator Available?</label>
                    <select
                      className="form-select"
                      value={newElevator}
                      onChange={(e) => setNewElevator(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Distance to Truck</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDistance}
                      onChange={(e) => setNewDistance(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'moving-date' && (
            <div className="form-group">
              <label htmlFor="movingDate" className="form-label">
                Preferred Moving Date:
              </label>
              <input
                id="movingDate"
                type="date"
                className="form-input"
                value={movingDate}
                onChange={(e) => setMovingDate(e.target.value)}
              />
            </div>
          )}

          {type === 'inventory' && (
            <div className="form-group">
              <p className="modal-description">
                Inventory items are linked to the estimator engine. To request changes or add
                items, our moving coordinator will contact you or update item counts below.
              </p>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
