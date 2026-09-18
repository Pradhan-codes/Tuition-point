import { useState } from 'react';
import { HERO_DATA } from '../../data/mockData';
import './HeroSearch.css';

/**
 * HeroSearch Component
 * 
 * Header search module featuring:
 * - Active vetted tutors pill counter
 * - High-impact dual-color title
 * - Two-part search input card (Subject/Goal + Location/Radius)
 * - Trending subject quick-filter chips
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - `handleSearch` can dispatch an Axios request to `/api/teachers/search?subject=${subject}&lng=...&lat=...&radius=5`
 */
const HeroSearch = () => {
  const [subject, setSubject] = useState(HERO_DATA.defaultSubject);
  const [location, setLocation] = useState(HERO_DATA.defaultLocation);
  const [selectedTrending, setSelectedTrending] = useState('GCSE Maths');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('[Search Query]:', { subject, location });
    // TODO: Wire up to backend /api/teachers/search
  };

  const handleTrendingClick = (tag) => {
    setSelectedTrending(tag);
    setSubject(tag);
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Active Badge Counter */}
        <div className="active-tutors-badge">
          <span className="badge-dot"></span>
          <span>{HERO_DATA.activeBadge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          {HERO_DATA.headlineMain}{' '}
          <span className="headline-accent">{HERO_DATA.headlineHighlight}</span>
        </h1>

        {/* Subtitle Description */}
        <p className="hero-subtitle">
          {HERO_DATA.subtitle}
        </p>

        {/* Dual Search Input Bar */}
        <form className="search-bar-card" onSubmit={handleSearch}>
          {/* Segment 1: Subject or Goal */}
          <div className="search-segment">
            <div className="segment-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div className="segment-content">
              <label htmlFor="subject-input" className="segment-label">
                SUBJECT OR GOAL
              </label>
              <input
                id="subject-input"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. A-Level Maths, Physics"
                className="segment-input"
              />
            </div>
          </div>

          <div className="search-divider"></div>

          {/* Segment 2: Location & Radius */}
          <div className="search-segment">
            <div className="segment-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="segment-content">
              <label htmlFor="location-input" className="segment-label">
                YOUR LOCATION
              </label>
              <input
                id="location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter postal code or town"
                className="segment-input"
              />
            </div>
          </div>

          {/* Find Teachers CTA Button */}
          <button type="submit" className="find-teachers-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Find Teachers</span>
          </button>
        </form>

        {/* Trending Chips Row */}
        <div className="trending-row">
          <div className="trending-label-group">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span className="trending-title">TRENDING:</span>
          </div>

          <div className="trending-chips-list">
            {HERO_DATA.trendingSubjects.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`trending-chip ${selectedTrending === tag ? 'active' : ''}`}
                onClick={() => handleTrendingClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
