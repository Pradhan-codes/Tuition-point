import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';


/**
 * Navbar Component
 * 
 * Top navigation bar featuring the TuitionPoint brand logo, the 'PROXIMITY'
 * location-engine badge, 'Become a Tutor' CTA, grid menu, and user avatar.
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - Replace the static avatar with `user.avatar` from your auth context/store.
 * - Wire 'Become a Tutor' to navigate to teacher onboarding / registration.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : '';
  const dashboardPath = user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';

  return (

    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left: Brand & Proximity Badge */}
        <div className="navbar-brand-group">
          <button
            type="button"
            className="navbar-logo"
            aria-label="TuitionPoint Home"
            onClick={() => navigate('/')}>
            {/* Custom Brand Icon */}
            <div className="logo-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
                <circle cx="17" cy="15" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="brand-text">TuitionPoint</span>
          </button>

          {/* Proximity Pill Badge */}
          <span className="proximity-badge">
            PROXIMITY
          </span>
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          {user ? (
            /* Logged-in state */
            <>
              <Link to={dashboardPath} className="become-tutor-link navbar-user-name">
                {user.name?.split(' ')[0]}
              </Link>

              <button className="icon-button" aria-label="Menu options">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
                </svg>
              </button>

              {/* Initials avatar — tap to log out */}
              <div className="navbar-avatar-wrapper">
                <button
                  type="button"
                  className="navbar-avatar-initial"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  {initial}
                </button>
              </div>
            </>
          ) : (
            /* Logged-out state */
            <>
              <Link to="/auth/register" className="become-tutor-link">
                Become a Tutor
              </Link>

              <button className="icon-button" aria-label="Menu options">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
                </svg>
              </button>

              <Link to="/auth/login" className="navbar-login-btn">
                Log In
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
