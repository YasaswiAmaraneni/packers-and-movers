import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MoveCard from './components/MoveCard';
import LoadingView from './components/LoadingView';
import FailureView from './components/FailureView';
import EditModal from './components/EditModal';
import { FaBars, FaTimes } from 'react-icons/fa';
import './App.css';

const API_URL = 'https://apis2.ccbp.in/packers-and-movers/packers-and-movers-details';

function App() {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('my-moves');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const fetchMoveDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server responded with status code: ${response.status}`);
      }

      const data = await response.json();

      // Parse response format:
      // Response has: { Customer_Estimate_Flow: [...] }
      let movesList = [];
      if (data && Array.isArray(data.Customer_Estimate_Flow)) {
        movesList = data.Customer_Estimate_Flow;
      } else if (Array.isArray(data)) {
        movesList = data;
      } else if (data && typeof data === 'object') {
        movesList = [data];
      }

      setMoves(movesList);
    } catch (err) {
      console.error('Fetch error:', err);
      // In development / offline testing, provide fallback to local response if network is unavailable
      try {
        const localRes = await fetch('/api_response.json');
        if (localRes.ok) {
          const localData = await localRes.json();
          if (localData && Array.isArray(localData.Customer_Estimate_Flow)) {
            setMoves(localData.Customer_Estimate_Flow);
            setLoading(false);
            return;
          }
        }
      } catch (localErr) {
        // Continue to show user-friendly error
      }
      setError(err.message || 'Failed to fetch packers and movers data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoveDetails();
  }, [fetchMoveDetails]);

  const handleEditSection = (type, move) => {
    setModalData({ type, move });
  };

  const handleSaveMove = (updatedMove) => {
    setMoves((prevMoves) =>
      prevMoves.map((m) =>
        m.estimate_id === updatedMove.estimate_id ? updatedMove : m
      )
    );
  };

  return (
    <div className="app-layout">
      {/* Mobile Top Navigation Bar */}
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="mobile-app-title">Packers &amp; Movers</h1>
      </header>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Left Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => {
            setActiveTab(tabId);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="main-content-container">
        {activeTab === 'my-moves' ? (
          <section className="moves-page-section">
            <h2 className="page-heading">My Moves</h2>

            {loading && <LoadingView />}

            {!loading && error && (
              <FailureView errorMessage={error} onRetry={fetchMoveDetails} />
            )}

            {!loading && !error && moves.length === 0 && (
              <div className="empty-moves-container">
                <p className="empty-moves-text">No active moves found at this time.</p>
                <button
                  type="button"
                  className="btn-solid-status"
                  onClick={fetchMoveDetails}
                >
                  Check Again
                </button>
              </div>
            )}

            {!loading && !error && moves.length > 0 && (
              <div className="moves-list-container">
                {moves.map((move, index) => (
                  <React.Fragment key={move.estimate_id || index}>
                    <MoveCard move={move} onEditSection={handleEditSection} />
                    {index < moves.length - 1 && <hr className="move-card-divider" />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="placeholder-tab-section">
            <h2 className="page-heading">
              {activeTab.replace('-', ' ').toUpperCase()}
            </h2>
            <div className="placeholder-card">
              <p>This section is under active development. Please return to <strong>MY MOVES</strong> to view your moves.</p>
              <button
                type="button"
                className="btn-outline-details"
                onClick={() => setActiveTab('my-moves')}
              >
                Back to My Moves
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Edit Modal for Interactive Actions */}
      {modalData && (
        <EditModal
          modalData={modalData}
          onClose={() => setModalData(null)}
          onSave={handleSaveMove}
        />
      )}
    </div>
  );
}

export default App;
