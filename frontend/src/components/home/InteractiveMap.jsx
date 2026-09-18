import { useState } from 'react';
import { MAP_CONFIG } from '../../data/mockData';
import './InteractiveMap.css';

/**
 * InteractiveMap Component
 * 
 * Recreates the geographic proximity search map for the Kensington / Hyde Park area:
 * - Stylized vector map canvas with realistic streets and landmarks
 * - Translucent proximity coverage zones (radius circles)
 * - User location pin (SW7)
 * - Nearby tutor rate pills (£45/h, £35/h)
 * - Featured interactive callout popup for Dr. Elena Rostova
 * - Map control overlays (Map/Satellite, Search this area, Zoom controls)
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * - When integrating Leaflet or Mapbox later, replace the SVG canvas with the map tiles
 *   and bind GeoJSON coordinates from `/api/teachers/search?lng=${lng}&lat=${lat}`.
 */
const InteractiveMap = () => {
  const [mapMode, setMapMode] = useState('Map');

  // Zoom stubs — wired up for future Leaflet/Mapbox integration
  const handleZoomIn = () => {};
  const handleZoomOut = () => {};

  // Popup is always visible in the static design; will be toggleable post-backend integration
  const isPopupVisible = true;


  return (
    <section className="map-section">
      <div className="container map-container">
        <div className="map-viewport-card">
          {/* Stylized Vector Map Background Canvas */}
          <div className={`map-canvas ${mapMode.toLowerCase()}`}>
            {/* Base Roads, Parks & Rivers via SVG */}
            <svg className="map-vector-svg" viewBox="0 0 1192 460" preserveAspectRatio="xMidYMid slice">
              {/* Background Ground Color */}
              <rect width="1192" height="460" fill="#f4f5f7" />

              {/* Park 1: Holland Park */}
              <path
                d="M 160,80 Q 240,70 270,120 Q 280,180 230,220 Q 170,230 140,170 Z"
                fill="#d8ecd6"
                stroke="#c2e0bf"
                strokeWidth="1.5"
              />

              {/* Park 2: Hyde Park & Kensington Gardens */}
              <path
                d="M 520,30 Q 720,20 860,60 Q 920,130 890,200 Q 760,230 630,200 Q 510,140 520,30 Z"
                fill="#d8ecd6"
                stroke="#c2e0bf"
                strokeWidth="1.5"
              />

              {/* Proximity Radius Concentric Circles centered around user in SW7 */}
              <circle cx="560" cy="240" r="280" fill="rgba(34, 197, 94, 0.05)" stroke="rgba(34, 197, 94, 0.2)" strokeDasharray="6 6" />
              <circle cx="560" cy="240" r="160" fill="rgba(34, 197, 94, 0.09)" stroke="rgba(34, 197, 94, 0.35)" />
              <circle cx="560" cy="240" r="70" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.25)" />

              {/* Secondary Road Network */}
              <g stroke="#e2e8f0" strokeWidth="3" fill="none">
                <path d="M 50,110 L 1150,130" />
                <path d="M 70,360 L 1150,340" />
                <path d="M 210,20 L 250,440" />
                <path d="M 460,20 L 410,440" />
                <path d="M 780,20 L 740,440" />
                <path d="M 980,20 L 920,440" />
                <path d="M 120,400 L 600,180" />
                <path d="M 500,420 L 950,220" />
              </g>

              {/* Main Arterial A-Roads (Warm Orange / Gold) */}
              <g stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* A315 Kensington High Street */}
                <path d="M 40,160 Q 300,165 520,180 T 1150,195" />
                {/* Cromwell Road */}
                <path d="M 60,300 Q 400,290 650,285 T 1140,290" />
                {/* North-South Connector */}
                <path d="M 480,20 Q 500,200 480,440" />
                <path d="M 820,30 Q 800,220 830,440" />
              </g>

              {/* Inner White Lane Highlights for Primary Roads */}
              <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M 40,160 Q 300,165 520,180 T 1150,195" />
                <path d="M 60,300 Q 400,290 650,285 T 1140,290" />
                <path d="M 480,20 Q 500,200 480,440" />
                <path d="M 820,30 Q 800,220 830,440" />
              </g>

              {/* Landmark Labels on Map Canvas */}
              <text x="180" y="150" fill="#477a45" fontSize="12" fontWeight="700" letterSpacing="0.06em">
                HOLLAND PARK
              </text>

              <text x="610" y="115" fill="#477a45" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                HYDE PARK &amp; KENSINGTON GARDENS
              </text>

              <text x="130" y="152" fill="#9a3412" fontSize="9" fontWeight="600">
                A315 Kensington High St
              </text>

              <text x="520" y="360" fill="#64748b" fontSize="11" fontWeight="600">
                Imperial College
              </text>

              <text x="490" y="420" fill="#64748b" fontSize="11" fontWeight="600">
                Natural History Museum
              </text>
            </svg>

            {/* University Landmark Marker (Blue Graduation Cap) */}
            <div className="landmark-pin university-pin" style={{ top: '75%', left: '59%' }}>
              <div className="landmark-bubble">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
            </div>

            {/* User Location Marker: 'Your Location (SW7)' */}
            <div className="user-location-marker" style={{ top: '56%', left: '33%' }}>
              <div className="user-location-pill">
                <span className="user-location-dot"></span>
                <span>{MAP_CONFIG.userLocation.label}</span>
              </div>
              <div className="user-location-arrow"></div>
            </div>

            {/* Tutor Marker 1: £45/h · 0.4 mi */}
            <div className="rate-marker" style={{ top: '28%', left: '35%' }}>
              <div className="rate-pill">
                <span className="rate-amount">£45/h</span>
                <span className="rate-sep">·</span>
                <span className="rate-dist">0.4 mi</span>
              </div>
              <div className="rate-arrow"></div>
            </div>

            {/* Tutor Marker 2: £35/h · 1.2 mi */}
            <div className="rate-marker" style={{ top: '72%', left: '26%' }}>
              <div className="rate-pill">
                <span className="rate-amount">£35/h</span>
                <span className="rate-sep">·</span>
                <span className="rate-dist">1.2 mi</span>
              </div>
              <div className="rate-arrow"></div>
            </div>

            {/* Featured Tutor Callout Card: Dr. Elena Rostova */}
            {isPopupVisible && (
              <div className="featured-tutor-callout" style={{ top: '28%', left: '51%' }}>
                <div className="callout-card">
                  {/* Top Badge Row */}
                  <div className="callout-header">
                    <span className="callout-badge">{MAP_CONFIG.featuredTutor.badge}</span>
                    <div className="callout-meta">
                      <span className="star-icon">★</span>
                      <span className="callout-rating">{MAP_CONFIG.featuredTutor.rating}</span>
                      <span className="callout-reviews">214 · 1.5 mi</span>
                    </div>
                  </div>

                  {/* Body: Avatar & Tutor Profile */}
                  <div className="callout-body">
                    <img
                      src={MAP_CONFIG.featuredTutor.avatar}
                      alt={MAP_CONFIG.featuredTutor.name}
                      className="callout-avatar"
                    />
                    <div className="callout-info">
                      <h4 className="callout-name">{MAP_CONFIG.featuredTutor.name}</h4>
                      <p className="callout-subject">{MAP_CONFIG.featuredTutor.subjects}</p>
                      <p className="callout-distance">{MAP_CONFIG.featuredTutor.distanceLabel}</p>
                    </div>
                  </div>

                  {/* Footer Row: Price & Quick View Button */}
                  <div className="callout-footer">
                    <div className="callout-price">
                      <span className="price-val">£{MAP_CONFIG.featuredTutor.hourlyRate}</span>
                      <span className="price-unit">/hr</span>
                    </div>
                    <button 
                      type="button" 
                      className="callout-cta"
                      onClick={() => console.log('Quick View clicked for Elena')}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                {/* Pointing triangle below card */}
                <div className="callout-pointer"></div>
              </div>
            )}
          </div>

          {/* Top-Left Proximity Indicator Pill */}
          <div className="map-top-left-pill">
            <span className="pulse-dot"></span>
            <span>{MAP_CONFIG.radiusLabel}</span>
          </div>

          {/* Top-Right Map/Satellite Toggle */}
          <div className="map-top-right-controls">
            <button
              type="button"
              className="map-layer-toggle"
              onClick={() => setMapMode(mapMode === 'Map' ? 'Satellite' : 'Map')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              <span>{mapMode} / Satellite</span>
            </button>
          </div>

          {/* Bottom-Center Floating 'Search this area' Pill */}
          <div className="map-bottom-center">
            <button type="button" className="search-area-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>Search this area</span>
            </button>
          </div>

          {/* Bottom-Right Zoom & Location Controls */}
          <div className="map-zoom-controls">
            <button type="button" className="zoom-btn" onClick={handleZoomIn} aria-label="Zoom in">
              +
            </button>
            <div className="zoom-divider"></div>
            <button type="button" className="zoom-btn" onClick={handleZoomOut} aria-label="Zoom out">
              −
            </button>
            <div className="zoom-divider"></div>
            <button type="button" className="zoom-btn locate-btn" aria-label="Locate me">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="7" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
