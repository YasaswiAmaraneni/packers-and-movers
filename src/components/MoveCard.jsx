import React, { useState } from 'react';
import {
  FaHome,
  FaBoxes,
  FaRoute,
  FaCalendarAlt,
  FaPencilAlt,
  FaCheckSquare,
  FaSquare,
  FaExclamationTriangle,
} from 'react-icons/fa';
import MoveRoute from './MoveRoute';
import MoveDetails from './MoveDetails';
import { formatMoveDate } from '../utils/formatters';

function MoveCard({ move, onEditSection }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlexible, setIsFlexible] = useState(
    move.move_date_flexible === '1' || move.move_date_flexible === 1 || true
  );

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleFlexible = () => {
    setIsFlexible((prev) => !prev);
  };

  const statusText = move.custom_status || 'Quotes Awaiting';

  return (
    <article className="move-card" aria-labelledby={`move-${move.estimate_id}`}>
      {/* 1. Origin, Direction & Destination Route Header */}
      <MoveRoute
        movingFrom={move.moving_from}
        movingTo={move.moving_to}
        estimateId={move.estimate_id}
      />

      {/* 2. Quick Move Info & Action Buttons Row */}
      <div className="move-meta-row">
        {/* Info badges/stats */}
        <div className="meta-stats-group">
          {/* Property Size */}
          <div className="meta-stat-item" title="Property Size">
            <FaHome className="meta-icon home-icon" />
            <span className="meta-text">{move.property_size || '1 BHK'}</span>
          </div>

          {/* Total Items */}
          <div className="meta-stat-item" title="Total Items">
            <FaBoxes className="meta-icon items-icon" />
            <span className="meta-text">{move.total_items || '0'}</span>
          </div>

          {/* Distance */}
          <div className="meta-stat-item" title="Distance">
            <FaRoute className="meta-icon distance-icon" />
            <span className="meta-text">{move.distance || '0 km'}</span>
          </div>

          {/* Moving Date & Time */}
          <div className="meta-stat-item date-time-stat" title="Moving Date">
            <FaCalendarAlt className="meta-icon calendar-icon" />
            <span className="meta-text">{formatMoveDate(move.moving_on)}</span>
            <button
              type="button"
              className="inline-icon-btn edit-date-btn"
              onClick={() => onEditSection && onEditSection('moving-date', move)}
              title="Edit move date"
              aria-label="Edit move date"
            >
              <FaPencilAlt className="pencil-icon" />
            </button>
          </div>

          {/* Is flexible checkbox */}
          <label className="flexible-checkbox-label">
            <input
              type="checkbox"
              checked={isFlexible}
              onChange={toggleFlexible}
              className="sr-only"
            />
            {isFlexible ? (
              <FaCheckSquare className="checkbox-icon checked" />
            ) : (
              <FaSquare className="checkbox-icon unchecked" />
            )}
            <span className="checkbox-text">Is flexible</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="meta-actions-group">
          <button
            type="button"
            className="btn-outline-details"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-controls={`details-${move.estimate_id}`}
          >
            {isExpanded ? 'Hide move details' : 'View move details'}
          </button>

          <button
            type="button"
            className="btn-solid-status"
            title={`Status: ${statusText}`}
          >
            {statusText}
          </button>
        </div>
      </div>

      {/* 3. Disclaimer Alert Row */}
      <div className="move-disclaimer-row">
        <FaExclamationTriangle className="disclaimer-alert-icon" />
        <p className="disclaimer-text">
          <strong>Disclaimer:</strong> Please update your move date before two days of shifting
        </p>
      </div>

      {/* 4. Expandable Details Section */}
      {isExpanded && <MoveDetails move={move} onEditSection={onEditSection} />}
    </article>
  );
}

export default MoveCard;
