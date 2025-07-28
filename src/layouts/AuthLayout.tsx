import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069)',
          filter: 'blur(8px)',
          opacity: '0.7'
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/30 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with logo */}
        <header className="w-full py-6 px-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
              <path d="M7 14h6v2H7v-2z" />
            </svg>
            <a href="/" className="text-2xl font-bold text-white hover:underline focus:outline-none">SmartSpace</a>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <Outlet />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-4 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} SmartSpace. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
