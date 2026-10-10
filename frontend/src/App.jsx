import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';

import HomePage from './pages/HomePage';
import FindTeachers from './pages/student/FindTeachers';
import TeacherDetails from './pages/student/TeacherDetails';
import TeacherRequests from './pages/teacher/TeacherRequests';
import StudentRequests from './pages/student/StudentRequests';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentProfile from './pages/student/StudentProfile';
import TeacherProfile from './pages/teacher/TeacherProfile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

import { useAuth } from './context/useAuth';
import './App.css';

/**
 * ProtectedRoute — redirects to /auth/login while still loading,
 * or if the user is not authenticated.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // wait for /api/auth/me before deciding
  if (!user) return <Navigate to="/auth/login" replace />;
  return children;
}

function RoleRoute({ role, children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} replace />;
  }
  return children;
}

/**
 * PublicOnlyRoute — redirects already-logged-in users away from
 * auth pages to their role-appropriate dashboard.
 */
function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    const dest = user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={dest} replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Auth pages — redirect away if already logged in */}
        <Route path="/auth/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/auth/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/auth/login/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />

        {/* Protected — student */}
        <Route path="/student/dashboard" element={<RoleRoute role="student"><StudentDashboard /></RoleRoute>} />
        <Route path="/student/profile" element={<RoleRoute role="student"><StudentProfile /></RoleRoute>} />
        <Route path="/student/find-teachers" element={<ProtectedRoute><FindTeachers /></ProtectedRoute>} />
        <Route path="/student/teacher-details/:id" element={<ProtectedRoute><TeacherDetails /></ProtectedRoute>} />
        <Route path="/student/teacher-details" element={<Navigate to="/student/find-teachers" replace />} />
        <Route path="/student/my-requests" element={<ProtectedRoute><StudentRequests /></ProtectedRoute>} />

        {/* Protected — teacher */}
        <Route path="/teacher/dashboard" element={<RoleRoute role="teacher"><TeacherDashboard /></RoleRoute>} />
        <Route path="/teacher/profile" element={<RoleRoute role="teacher"><TeacherProfile /></RoleRoute>} />
        <Route path="/teacher/my-requests" element={<ProtectedRoute><TeacherRequests /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
