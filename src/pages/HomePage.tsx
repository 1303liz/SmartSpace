import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-gradient">Find Your</span>
              <br />
              <span className="text-slate-900">Perfect Space</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Book professional spaces for meetings, events, and more. 
              Simple, fast, and reliable space management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/spaces" className="btn-primary text-lg px-8 py-4">
                Browse Spaces
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn-outline text-lg px-8 py-4">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to book your perfect space
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-slate-900 transition-colors duration-300">
                <span className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Discover Spaces</h3>
              <p className="text-slate-600 leading-relaxed">
                Browse our curated collection of professional spaces designed for every need
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-slate-900 transition-colors duration-300">
                <span className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Book Instantly</h3>
              <p className="text-slate-600 leading-relaxed">
                Real-time availability with instant confirmation for all your booking needs
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-slate-900 transition-colors duration-300">
                <span className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Focus on What Matters</h3>
              <p className="text-slate-600 leading-relaxed">
                Show up and focus on your work while we handle all the details
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section gradient-bg">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-slate-600 font-medium">Spaces Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">10K+</div>
              <div className="text-slate-600 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 font-medium">SJ</span>
                </div>
                <div>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    "SmartSpace made finding and booking our company event space incredibly easy. 
                    The whole process took minutes instead of hours!"
                  </p>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Johnson</div>
                    <div className="text-sm text-slate-500">Marketing Director</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 font-medium">MC</span>
                </div>
                <div>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    "As a venue owner, SmartSpace has helped me maximize bookings and 
                    streamline management. The platform is intuitive and reliable."
                  </p>
                  <div>
                    <div className="font-semibold text-slate-900">Michael Chen</div>
                    <div className="text-sm text-slate-500">Event Space Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-transparent">
        <div className="container mx-auto flex justify-center">
          <div className="w-full max-w-2xl bg-slate-900 text-white rounded-3xl shadow-2xl px-8 py-12 text-center border border-slate-800">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8">
              Join thousands of satisfied users who trust <span className="font-semibold text-white">SmartSpace</span> for their space needs
            </p>
            <Link 
              to={isAuthenticated ? "/spaces" : "/register"} 
              className="inline-block bg-white text-slate-900 hover:bg-slate-100 transition-all duration-200 font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isAuthenticated ? "Browse Spaces" : "Get Started Now"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
