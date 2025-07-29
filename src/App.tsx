import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import PasswordResetConfirmPage from './pages/PasswordResetConfirmPage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import BookingFormPage from './pages/BookingFormPage';
import SpacesPage from './pages/SpacesPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
   
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <SidebarProvider>
            <Routes>
              {/* Auth Routes - No header, footer, or sidebar */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/password-reset" element={<PasswordResetRequestPage />} />
                <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordResetConfirmPage />} />
              </Route>
              
              {/* Main Routes - With header, footer, and sidebar */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/bookings/new" element={
                  <ProtectedRoute>
                    <BookingFormPage />
                  </ProtectedRoute>
                } />
                <Route path="/spaces" element={<SpacesPage />} />
                <Route path="/spaces/:spaceId" element={<SpacesPage />} />
              </Route>
            </Routes>
          </SidebarProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
 );
}

export default App;