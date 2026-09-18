import { useState } from 'react';

/**
 * TutorCard Component
 * 
 * Individual tutor profile card displaying:
 * - High-res portrait with DBS verification badge & distance overlay
 * - Wishlist heart toggle
 * - Education pedigree & teaching experience
 * - Subject tags & teaching mode pill
 * - Hourly rate & 'Book Trial' CTA
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - Maps directly to `TeacherProfile` schema:
 *   `tutor.user.name`, `tutor.hourlyRate`, `tutor.subjects`, `tutor.teachingMode`, `tutor.distanceKm`
 */
const TutorCard = ({ tutor }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleBookTrial = () => {
    console.log(`[Book Trial]: Initializing booking session with ${tutor.name} (ID: ${tutor.id})`);
    // TODO: Wire to booking flow or message thread (/api/student/requests)
  };

  return (
    <article className="tutor-card">
      {/* Top Media / Thumbnail Wrapper */}
      <div className="tutor-image-wrapper">
        <img
          src={tutor.image}
          alt={`Profile portrait of ${tutor.name}`}
          className="tutor-image"
          loading="lazy"
        />

        {/* Top-Left: Verified DBS Badge */}
        {tutor.verifiedDBS && (
          <div className="dbs-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Verified DBS</span>
          </div>
        )}

        {/* Top-Right: Save / Favorite Button */}
        <button
          type="button"
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveToggle}
          aria-label={isSaved ? 'Remove from saved' : 'Save tutor to favorites'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? '#ef4444' : 'none'} stroke={isSaved ? '#ef4444' : '#ffffff'} strokeWidth="2.2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Bottom Image Overlay: Distance & Travel Capability */}
        <div className="distance-overlay-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{tutor.distance}</span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="tutor-card-body">
        {/* Name & Star Rating */}
        <div className="tutor-header-row">
          <h3 className="tutor-name" title={tutor.name}>
            {tutor.name}
          </h3>
          <div className="tutor-rating-group">
            <span className="star-symbol">★</span>
            <span className="rating-score">{tutor.rating}</span>
            {tutor.reviewsCount && (
              <span className="reviews-count">({tutor.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Experience & University Credentials */}
        <p className="tutor-education">
          {tutor.education}
        </p>

        {/* Subject Specialty Tags */}
        <div className="tutor-tags-row">
          {tutor.subjects.map((sub, idx) => (
            <span key={idx} className="subject-pill">
              {sub}
            </span>
          ))}
        </div>

        {/* Teaching Mode Tag */}
        <div className="tutor-mode-row">
          <span className="mode-pill">
            {tutor.mode}
          </span>
        </div>

        {/* Card Footer: Hourly Price & CTA Button */}
        <div className="tutor-card-footer">
          <div className="price-container">
            <span className="hourly-rate">£{tutor.hourlyRate}</span>
            <span className="rate-period">/ hr</span>
          </div>

          <button
            type="button"
            className="book-trial-btn"
            onClick={handleBookTrial}
          >
            Book Trial
          </button>
        </div>
      </div>
    </article>
  );
};

export default TutorCard;
