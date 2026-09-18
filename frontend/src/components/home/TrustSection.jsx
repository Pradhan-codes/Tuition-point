import { TRUST_FEATURES } from '../../data/mockData';
import './TrustSection.css';

/**
 * TrustSection Component
 * 
 * Recreates the trust and safety guarantee value propositions:
 * - 'WHY FAMILIES TRUST TUITIONPOINT' heading
 * - 4 Key pillars: Verified Backgrounds, Neighborhood Matches,
 *   Trial Session Guarantee, and Direct Chat & Pay.
 */
const TrustSection = () => {
  // Helper to render custom SVG icons matching each feature pillar
  const renderIcon = (type) => {
    switch (type) {
      case 'shield':
        return (
          <div className="feature-icon-wrapper icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        );
      case 'compass':
        return (
          <div className="feature-icon-wrapper icon-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
        );
      case 'medal':
        return (
          <div className="feature-icon-wrapper icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
        );
      case 'chat':
        return (
          <div className="feature-icon-wrapper icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="trust-section">
      <div className="container">
        {/* Section Title Header */}
        <div className="trust-header">
          <span className="trust-eyebrow">
            WHY FAMILIES TRUST TUITIONPOINT
          </span>
          <h2 className="trust-title">
            A Safe, Community-First Marketplace
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="trust-grid">
          {TRUST_FEATURES.map((feat) => (
            <div key={feat.id} className="trust-card">
              {renderIcon(feat.iconType)}
              <h3 className="trust-card-title">{feat.title}</h3>
              <p className="trust-card-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
