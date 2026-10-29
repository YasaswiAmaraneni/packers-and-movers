import React from 'react';
import { FaExclamationCircle, FaRedo } from 'react-icons/fa';

function FailureView({ errorMessage, onRetry }) {
  return (
    <div className="status-view-container failure-view" role="alert">
      <FaExclamationCircle className="failure-icon" />
      <h3 className="status-title">Oops! Something went wrong</h3>
      <p className="status-desc">
        {errorMessage || 'Failed to fetch packers and movers details. Please check your connection.'}
      </p>
      {onRetry && (
        <button type="button" className="btn-retry" onClick={onRetry}>
          <FaRedo className="retry-icon" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

export default FailureView;
