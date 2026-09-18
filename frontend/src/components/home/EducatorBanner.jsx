import { EDUCATOR_CTA_DATA } from '../../data/mockData';
import './EducatorBanner.css';

/**
 * EducatorBanner Component
 * 
 * High-contrast dark navy card designed to convert prospective tutors:
 * - 'FOR QUALIFIED EDUCATORS' badge
 * - Compelling value proposition on 100% earnings retention & local flexibility
 * - 'Start Tutoring →' and 'How Earnings Work' CTAs
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - 'Start Tutoring' can route to `/teacher-onboarding` or trigger an auth modal.
 */
const EducatorBanner = () => {
  return (
    <section className="educator-section">
      <div className="container">
        <div className="educator-card">
          {/* Left: Value Proposition */}
          <div className="educator-content">
            <div className="educator-badge">
              <span className="educator-badge-dot">●</span>
              <span>{EDUCATOR_CTA_DATA.badge}</span>
            </div>

            <h2 className="educator-heading">
              {EDUCATOR_CTA_DATA.heading}
            </h2>

            <p className="educator-subtext">
              {EDUCATOR_CTA_DATA.subtext}
            </p>
          </div>

          {/* Right: Action Buttons */}
          <div className="educator-actions">
            <button
              type="button"
              className="educator-primary-btn"
              onClick={() => console.log('Start Tutoring clicked')}
            >
              <span>{EDUCATOR_CTA_DATA.primaryButtonText}</span>
            </button>

            <button
              type="button"
              className="educator-secondary-btn"
              onClick={() => console.log('How Earnings Work clicked')}
            >
              <span>{EDUCATOR_CTA_DATA.secondaryButtonText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducatorBanner;
