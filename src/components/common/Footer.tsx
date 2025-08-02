import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Mobile Footer */}
        <div className="block lg:hidden space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-3">SmartSpace</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Premium spaces for your professional needs, booked by the day
            </p>
          </div>

          <div className="grid gap-8 justify-center">
            <div>
              <h4 className="text-slate-200 font-semibold text-sm mb-4 uppercase tracking-wide">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/spaces" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Spaces
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/bookings" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Bookings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold text-sm mb-4 uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-6 pt-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                ),
                label: "Facebook",
                href: "#"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                ),
                label: "Twitter",
                href: "#"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                label: "LinkedIn",
                href: "#"
              }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-slate-700"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="text-center pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-xs">
              © {currentYear} SmartSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden lg:grid grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">SmartSpace</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Premium workspace solutions for modern professionals. Book quality meeting rooms, 
                conference halls, and creative spaces by the day for your business needs.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                <span>hello@smartspace.co.ke</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-2">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  ),
                  label: "Facebook",
                  href: "#"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                  label: "Twitter",
                  href: "#"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  label: "LinkedIn",
                  href: "#"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.118.112.222.083.343-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  ),
                  label: "Pinterest",
                  href: "#"
                }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-slate-700"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/spaces" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Browse Spaces
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-slate-300 hover:text-white transition-colors text-sm">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <a href="mailto:support@smartspace.co.ke" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Desktop */}
        <div className="hidden lg:block border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} SmartSpace. All rights reserved. Made with ❤️ in Kenya.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-slate-500 text-xs">Powered by innovation</span>
              <div className="flex space-x-4">
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Privacy
                </Link>
                <Link to="/terms-of-service" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Terms
                </Link>
                <Link to="/cookie-policy" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;