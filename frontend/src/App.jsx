import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';
import './App.css';

/**
 * App Root Component
 * 
 * Sets up the primary shell for TuitionPoint Marketplace:
 * - Persistent Sticky Navbar
 * - Full-fidelity Home Landing Page
 * - Global Marketplace Footer
 * - Mobile-friendly Bottom Navigation Dock
 */
function App() {
  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Marketplace Page Content */}
      <HomePage />

      {/* Footer Links & Coverage Info */}
      <Footer />

      {/* Persistent Bottom Mobile Navigation Bar */}
      <BottomNav />
    </div>
  );
}

export default App;
