import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';

const Sidebar: React.FC = () => {
  const { isOpen, close } = useSidebar();
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Enhanced Overlay with fade animation */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={close}
      />

      {/* Enhanced Sidebar with slide-in animation */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 transform transition-all duration-300 ease-in-out overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header with subtle gradient */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <Link 
              to="/" 
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700 hover:from-gray-700 hover:to-gray-500 transition-all duration-300" 
              onClick={close}
            >
              SmartSpace
            </Link>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:rotate-90 hover:scale-110"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links with enhanced interaction */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={close}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform hover:translate-x-1
                    ${location.pathname === '/' 
                      ? 'bg-gradient-to-r from-gray-200 to-gray-100 text-black shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${location.pathname === '/' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="font-medium">Home</span>
                  {location.pathname === '/' && (
                    <span className="ml-auto w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  onClick={close}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform hover:translate-x-1
                    ${location.pathname === '/dashboard' 
                      ? 'bg-gradient-to-r from-gray-200 to-gray-100 text-black shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${location.pathname === '/dashboard' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <span className="font-medium">Dashboard</span>
                  {location.pathname === '/dashboard' && (
                    <span className="ml-auto w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/spaces"
                  onClick={close}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform hover:translate-x-1
                    ${location.pathname === '/spaces' 
                      ? 'bg-gradient-to-r from-gray-200 to-gray-100 text-black shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${location.pathname === '/spaces' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-medium">Spaces</span>
                  {location.pathname === '/spaces' && (
                    <span className="ml-auto w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/bookings"
                  onClick={close}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 transform hover:translate-x-1
                    ${location.pathname === '/bookings' 
                      ? 'bg-gradient-to-r from-gray-200 to-gray-100 text-black shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${location.pathname === '/bookings' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">Bookings</span>
                  {location.pathname === '/bookings' && (
                    <span className="ml-auto w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Enhanced Bottom Section */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-white to-gray-50">
            <Link
              to="/login"
              onClick={close}
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-700 transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Login</span>
              </div>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;