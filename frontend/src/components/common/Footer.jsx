import { FOOTER_DATA } from '../../data/mockData';
import './Footer.css';

/**
 * Footer Component
 * 
 * Clean minimalist footer reflecting the design:
 * - Brand logo
 * - Essential navigation & safety policies
 * - Geolocation service coverage notice
 * - Copyright & legal declaration
 */
const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="container">
        {/* Top Tier: Brand & Navigation */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
                <circle cx="17" cy="15" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="footer-brand-title">TuitionPoint</span>
          </div>

          <nav className="footer-nav-links" aria-label="Footer navigation">
            {FOOTER_DATA.navLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-separator"></div>

        {/* Bottom Tier: Coverage & Copyright */}
        <div className="footer-bottom-row">
          <div className="footer-coverage">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{FOOTER_DATA.serviceCoverage}</span>
          </div>

          <p className="footer-copyright">
            {FOOTER_DATA.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
