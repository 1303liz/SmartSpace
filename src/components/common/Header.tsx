import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { toggle } = useSidebar();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#001D65] via-[#0056B3] to-[#00B5F1] bg-opacity-95 backdrop-blur-sm shadow-md border-b border-blue-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left section with menu button and logo */}
          <div className="flex items-center">
            <button
              onClick={toggle}
              className="p-2 hover:bg-white/20 rounded-xl lg:hidden transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="text-xl font-bold text-white ml-2 lg:ml-0 hover:text-yellow-100 transition-colors">
              SmartSpace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-white hover:text-yellow-100 transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/spaces" 
              className="text-white hover:text-yellow-100 transition-colors font-medium"
            >
              Spaces
            </Link>
            {isAuthenticated && (
              <Link 
                to="/bookings" 
                className="text-white hover:text-yellow-100 transition-colors font-medium"
              >
                My Bookings
              </Link>
            )}
          </nav>

          {/* Right section with action buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-white hidden sm:inline font-medium">
                  {user?.fullName || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-100 text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-yellow-100 transition-colors text-sm font-medium hidden sm:inline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-[#001D65] hover:bg-cyan-100 hover:text-[#001D65] font-semibold text-sm px-5 py-2 rounded-xl shadow transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
