import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { BOTTOM_NAV_ITEMS } from '../../data/mockData';
import './BottomNav.css';

/**
 * BottomNav Component
 *
 * Mobile/responsive bottom navigation dock. Active tab is derived from
 * the current URL so it stays in sync on page refresh and direct navigation.
 * Tab destinations are role-aware (student vs. teacher).
 */
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  /** Map each tab id to a path based on user role */
  const tabPaths = {
    explore: user?.role === 'teacher' ? '/teacher/dashboard' : '/student/find-teachers',
    saved:    '/student/find-teachers', // placeholder until saved page exists
    bookings: user?.role === 'teacher' ? '/teacher/my-requests' : '/student/my-requests',
    inbox:    '/',                       // placeholder until inbox page exists
    profile:  user?.role === 'teacher' ? '/teacher/profile' : '/student/profile',
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/student/find-teachers')) return 'explore';
    if (path.startsWith('/teacher/dashboard') || path.startsWith('/teacher/my-requests')) return 'explore';
    if (path.startsWith('/student/my-requests'))  return 'bookings';
    if (path.startsWith('/student/profile') || path.startsWith('/teacher/profile')) return 'profile';
    return '';
  };

  const activeTab = getActiveTab();

  const renderIcon = (id) => {
    switch (id) {
      case 'explore':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
          </svg>
        );
      case 'saved':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'bookings':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'inbox':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'profile':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bottom-nav-root" aria-label="Mobile Bottom Navigation">
      <div className="bottom-nav-container">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => navigate(tabPaths[item.id])}
            >
              <div className="tab-icon-wrapper">
                {renderIcon(item.id)}
              </div>
              <span className="tab-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
