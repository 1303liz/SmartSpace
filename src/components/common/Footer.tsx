import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {/* Left Section - Brand and Copyright */}
          <div className="text-center sm:text-left space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">SmartSpace</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <nav className="flex flex-col items-center sm:items-start space-y-4">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="flex flex-col items-center sm:items-start space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/spaces" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Spaces
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section - Contact */}
          <div className="text-center sm:text-left space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="block sm:inline">Email: </span>
                <a href="mailto:info@smartspace.com" className="hover:text-white transition-colors">info@smartspace.com</a>
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="block sm:inline">Phone: </span>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
              </p>
            </div>
            <div className="flex justify-center sm:justify-start space-x-6 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
