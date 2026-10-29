import React from 'react';

function LoadingView() {
  return (
    <div className="status-view-container" role="status" aria-live="polite">
      <div className="spinner-loader" />
      <h3 className="status-title">Loading Move Details...</h3>
      <p className="status-desc">Fetching your relocation tracking information</p>
    </div>
  );
}

export default LoadingView;
