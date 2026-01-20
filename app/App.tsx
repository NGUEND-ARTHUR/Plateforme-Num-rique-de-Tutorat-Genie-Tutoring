import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/contexts/AppContext';

// Pages
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import DashboardLayout from '@/components/DashboardLayout';

// Parent Pages
import ParentDashboard from '@/pages/parent/Dashboard';
import MyChildren from '@/pages/parent/MyChildren';
import FindTutor from '@/pages/parent/FindTutor';
import ScheduleCourse from '@/pages/parent/ScheduleCourse';
import ParentCourses from '@/pages/parent/Courses';
import ParentReports from '@/pages/parent/Reports';
import ParentMessages from '@/pages/parent/Messages';
import ParentSettings from '@/pages/parent/Settings';

// Student Pages
import StudentDashboard from '@/pages/student/Dashboard';
import StudentCourses from '@/pages/student/Courses';
import VirtualClassroom from '@/pages/student/VirtualClassroom';
import Objectives from '@/pages/student/Objectives';
import Grades from '@/pages/student/Grades';
import StudentMessages from '@/pages/student/Messages';
import StudentSettings from '@/pages/student/Settings';

// Tutor Pages
import TutorDashboard from '@/pages/tutor/Dashboard';
import MyStudents from '@/pages/tutor/MyStudents';
import TutorCourses from '@/pages/tutor/Courses';
import TutorClassroom from '@/pages/tutor/VirtualClassroom';
import PedagogicalTracking from '@/pages/tutor/PedagogicalTracking';
import TutorReports from '@/pages/tutor/Reports';
import TutorMessages from '@/pages/tutor/Messages';
import TutorProfile from '@/pages/tutor/Profile';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import Users from '@/pages/admin/Users';
import TutorValidation from '@/pages/admin/TutorValidation';
import StudentsParents from '@/pages/admin/StudentsParents';
import ClassesSubjects from '@/pages/admin/ClassesSubjects';
import AdminCourses from '@/pages/admin/Courses';
import AdminReports from '@/pages/admin/Reports';
import SystemSettings from '@/pages/admin/SystemSettings';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />

          {/* Parent Routes */}
          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ParentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/children"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <MyChildren />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/tutors"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <FindTutor />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/schedule"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ScheduleCourse />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/courses"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ParentCourses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/reports"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ParentReports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/messages"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ParentMessages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/settings"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <ParentSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <StudentCourses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/classroom"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <VirtualClassroom />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/objectives"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <Objectives />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/grades"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <Grades />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/messages"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <StudentMessages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/settings"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student">
                  <StudentSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Tutor Routes */}
          <Route
            path="/tutor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/students"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <MyStudents />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/courses"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorCourses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/classroom"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorClassroom />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/tracking"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <PedagogicalTracking />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/reports"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorReports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/messages"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorMessages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/profile"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <TutorProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <Users />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/validation"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <TutorValidation />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students-parents"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <StudentsParents />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/classes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <ClassesSubjects />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <AdminCourses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <AdminReports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <SystemSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;