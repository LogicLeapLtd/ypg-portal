import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useAuth } from './contexts/AuthContext';

// Layouts
import StudentLayout from './components/Layout/StudentLayout';
import AdminLayout from './components/Layout/AdminLayout';

// Public pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import OnboardingPage from './pages/OnboardingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Student pages
import StudentDashboardPage from './pages/student/DashboardPage';
import PortfolioPage from './pages/student/PortfolioPage';
import CareerExplorerPage from './pages/student/CareerExplorerPage';
import StudentProfilePage from './pages/student/ProfilePage';
import ResourcesPage from './pages/student/ResourcesPage';

// Admin pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import ContentManagementPage from './pages/admin/ContentManagementPage';
import DataExportPage from './pages/admin/DataExportPage';

// Initialize React Query client
const queryClient = new QueryClient();

// Protected route component for any authenticated user
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Student route component
const StudentRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isStudent } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isStudent()) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Onboarding check component - makes sure student has completed onboarding
const RequireOnboarding = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  if (user?.role === 'student' && 'onboardingCompleted' in user && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Email verification check component
const RequireEmailVerification = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  if (user?.role === 'student' && 'emailVerified' in user && !user.emailVerified) {
    return <Navigate to="/email-verification" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user } = useAuth();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Email verification route */}
        <Route 
          path="/email-verification" 
          element={
            <ProtectedRoute>
              <EmailVerificationPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Onboarding route */}
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <RequireEmailVerification>
                <OnboardingPage />
              </RequireEmailVerification>
            </ProtectedRoute>
          } 
        />
        
        {/* Student routes */}
        <Route
          path="/"
          element={
            <StudentRoute>
              <RequireEmailVerification>
                <RequireOnboarding>
                  <StudentLayout />
                </RequireOnboarding>
              </RequireEmailVerification>
            </StudentRoute>
          }
        >
          <Route index element={<StudentDashboardPage />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="careers" element={<CareerExplorerPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>
        
        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="content" element={<ContentManagementPage />} />
          <Route path="export" element={<DataExportPage />} />
        </Route>
        
        {/* Redirect based on user role */}
        <Route
          path="*"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
