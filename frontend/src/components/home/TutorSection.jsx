import { useState } from 'react';
import { TUTORS_LIST, TUTOR_FILTERS } from '../../data/mockData';
import TutorCard from './TutorCard';
import './TutorSection.css';

/**
 * TutorSection Component
 * 
 * Grid container showcasing top-rated vetted tutors in the user's vicinity:
 * - Neighborhood verification pill
 * - Quick filter toggles (Price, In-Person, Verified DBS)
 * - 'View 24 nearby' deep-link
 * - 4 Responsive tutor cards
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - Filter chip clicks can trigger a refetch of `/api/teachers/search` with updated query params.
 */
const TutorSection = () => {
  const [filters, setFilters] = useState(TUTOR_FILTERS);

  const toggleFilter = (filterId) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === filterId ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <section className="tutors-section">
      <div className="container">
        {/* Section Heading & Filter Header */}
        <div className="tutors-section-header">
          <div className="tutors-title-group">
            <div className="neighborhood-verified-badge">
              <span className="badge-bullet">●</span>
              <span>NEIGHBORHOOD VERIFIED</span>
            </div>
            <h2 className="tutors-main-heading">
              Top Tutors Near Kensington
            </h2>
          </div>

          {/* Quick Filter Bar */}
          <div className="tutors-filter-controls">
            {/* Filter Toggle Button */}
            <button type="button" className="main-filter-btn" aria-label="Open advanced filter modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>Filters</span>
            </button>

            {/* Filter Chips */}
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`filter-chip ${filter.active ? 'active' : ''}`}
                onClick={() => toggleFilter(filter.id)}
              >
                <span>{filter.label}</span>
              </button>
            ))}

            {/* View All Nearby Link */}
            <a href="#view-all" className="view-nearby-link">
              <span>View 24 nearby</span>
              <span className="arrow-sym">→</span>
            </a>
          </div>
        </div>

        {/* 4-Card Tutor Grid */}
        <div className="tutors-grid">
          {TUTORS_LIST.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorSection;
