import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function MoveRoute({ movingFrom, movingTo, estimateId }) {
  return (
    <div className="move-route-container">
      {/* Origin Column */}
      <div className="route-block origin-block">
        <h4 className="route-label">From</h4>
        <p className="route-address" title={movingFrom}>
          {movingFrom || 'Address not available'}
        </p>
      </div>

      {/* Directional Arrow Circle */}
      <div className="route-arrow-wrapper">
        <div className="route-arrow-circle" aria-label="Moves to">
          <FaArrowRight className="route-arrow-icon" />
        </div>
      </div>

      {/* Destination Column */}
      <div className="route-block destination-block">
        <h4 className="route-label">To</h4>
        <p className="route-address" title={movingTo}>
          {movingTo || 'Address not available'}
        </p>
      </div>

      {/* Request ID Column */}
      <div className="route-block request-block">
        <h4 className="route-label">Request#</h4>
        <p className="request-id-text">{estimateId || 'N/A'}</p>
      </div>
    </div>
  );
}

export default MoveRoute;
