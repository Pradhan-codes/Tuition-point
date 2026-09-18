import HeroSearch from '../components/home/HeroSearch';
import InteractiveMap from '../components/home/InteractiveMap';
import TutorSection from '../components/home/TutorSection';
import TrustSection from '../components/home/TrustSection';
import EducatorBanner from '../components/home/EducatorBanner';
import './HomePage.css';

/**
 * HomePage Component
 * 
 * Main marketplace landing page strictly matching the design blueprint:
 * 1. HeroSearch - Query inputs, proximity counter, trending tags
 * 2. InteractiveMap - Visual proximity radius, neighborhood markers & featured tutor card
 * 3. TutorSection - Verified tutor cards with pricing, DBS checks & booking actions
 * 4. TrustSection - Safety, background check & trial guarantee highlights
 * 5. EducatorBanner - Dark high-conversion recruitment banner for tutors
 */
const HomePage = () => {
  return (
    <main className="homepage-main">
      {/* 1. Hero & Dual Search Bar */}
      <HeroSearch />

      {/* 2. Interactive Geo Proximity Map */}
      <InteractiveMap />

      {/* 3. Vetted Neighborhood Tutors Grid */}
      <TutorSection />

      {/* 4. Trust & Safety Value Pillars */}
      <TrustSection />

      {/* 5. For Qualified Educators Dark Banner */}
      <EducatorBanner />
    </main>
  );
};

export default HomePage;
