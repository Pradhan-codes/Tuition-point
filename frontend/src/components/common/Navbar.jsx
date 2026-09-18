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
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left: Brand & Proximity Badge */}
        <div className="navbar-brand-group">
          <a href="/" className="navbar-logo" aria-label="TuitionPoint Home">
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
          </a>

          {/* Proximity Pill Badge */}
          <span className="proximity-badge">
            PROXIMITY
          </span>
        </div>

        {/* Right: Actions, Navigation & Profile */}
        <div className="navbar-actions">
          <a href="#become-tutor" className="become-tutor-link">
            Become a Tutor
          </a>

          {/* 3x3 Grid Icon */}
          <button className="icon-button" aria-label="Menu options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="5" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
            </svg>
          </button>

          {/* User Profile Avatar */}
          <div className="navbar-avatar-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
              alt="User profile" 
              className="navbar-avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
