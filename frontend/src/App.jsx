import { Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';

import HomePage from './pages/HomePage';
import FindTeachers from './pages/student/FindTeachers';

import './App.css';
import TeacherDetails from './pages/student/TeacherDetails';
import TeacherRequests from './pages/teacher/TeacherRequests';
import StudentRequests from './pages/student/StudentRequests';

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/find-teachers" element={<FindTeachers />} />
        <Route path="/student/teacher-details" element={<TeacherDetails />} />
        <Route path="/student/my-requests" element={<StudentRequests />} />
        <Route path="/teacher/my-requests" element={<TeacherRequests />} />
      </Routes>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;