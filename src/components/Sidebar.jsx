import React from 'react';
import { FaTruckMoving, FaUser, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa';

const NAV_ITEMS = [
  { id: 'my-moves', label: 'MY MOVES', icon: FaTruckMoving },
  { id: 'my-profile', label: 'MY PROFILE', icon: FaUser },
  { id: 'get-quote', label: 'GET QUOTE', icon: FaFileInvoiceDollar },
  { id: 'logout', label: 'LOGOUT', icon: FaSignOutAlt },
];

function Sidebar({ activeTab = 'my-moves', onSelectTab }) {
  return (
    <aside className="sidebar-container" aria-label="Sidebar navigation">
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab && onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar-icon-wrapper">
                <Icon className="sidebar-icon" />
              </span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
