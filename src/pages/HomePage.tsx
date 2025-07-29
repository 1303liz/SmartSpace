import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ImageCarousel from '../components/common/ImageCarousel';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';

import { getSpaces } from '../services/spaces';
import type { Space } from '../services/spaces';
import { API_BASE_URL } from '../services/baseUrl';
// Helper function to get the full image URL (copied from SpaceCard)
const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  const baseImageUrl = API_BASE_URL.replace('/api', '');
  return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

// Fallback images for spaces that don't have images (copied from SpaceCard)
import conferenceHall from '../assets/confrece hall.jpg';
import eventHall from '../assets/event hall.jpg';
import lab from '../assets/lab.jpg';

const getSpaceImage = (space: Space) => {
  if (space.image1) return getImageUrl(space.image1);
  if (space.image2) return getImageUrl(space.image2);
  if (space.image3) return getImageUrl(space.image3);
  if (space.image4) return getImageUrl(space.image4);
  if (space.image5) return getImageUrl(space.image5);
  if (space.capacity > 100) return eventHall;
  if (space.capacity > 30) return conferenceHall;
  return lab;
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Hero carousel images from backend spaces
  const [carouselImages, setCarouselImages] = useState<any[]>([]);

  // Featured spaces state
  const [featuredSpaces, setFeaturedSpaces] = useState<Space[]>([]);
  const [spacesLoading, setSpacesLoading] = useState(false);
  const [spacesError, setSpacesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      setSpacesLoading(true);
      setSpacesError(null);
      try {
        const allSpaces = await getSpaces();
        // Pick 3 random spaces for featured
        const shuffled = allSpaces.sort(() => 0.5 - Math.random());
        setFeaturedSpaces(shuffled.slice(0, 3));

        // Use up to 5 spaces for hero carousel
        const heroSlides = allSpaces.slice(0, 5).map((space) => ({
          src: getSpaceImage(space),
          alt: space.name,
          title: space.name,
          description: space.description || '',
        }));
        setCarouselImages(heroSlides);
      } catch (err: any) {
        setSpacesError(err?.detail || 'Failed to load spaces');
      } finally {
        setSpacesLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="hero-section relative">
        {/* Dark overlay with gradient for better text visibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b md:bg-gradient-to-r from-black/75 via-black/60 to-black/40 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mobile-hero-content max-w-lg md:max-w-2xl mx-auto p-6 md:p-0 rounded-xl md:rounded-none text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                <span>Find Your</span>
                <br />
                <span className="text-white">Perfect Space</span>
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed mx-auto max-w-xl">
                Book professional spaces for meetings, events, and more. 
                Simple, fast, and reliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/spaces" 
                  className="btn-primary flex items-center justify-center text-base px-6 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Browse Spaces
                </Link>
                {!isAuthenticated && (
                  <Link 
                    to="/register" 
                    className="btn-outline flex items-center justify-center text-base px-6 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Carousel */}
        <div className="hero-carousel h-[550px] md:h-[600px] w-full overflow-hidden">
          <ImageCarousel 
            images={carouselImages} 
            showIndicators={true}
            className="w-full h-full"
            autoPlay={true}
            interval={7000}
            showThumbs={false}
          />
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


      {/* Featured Spaces Section */}
      <section className="section bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Featured Spaces</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our most popular and highly-rated spaces
            </p>
          </div>
          {spacesLoading ? (
            <div className="text-center py-10 text-gray-500">Loading featured spaces...</div>
          ) : spacesError ? (
            <div className="text-center py-10 text-red-500">{spacesError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredSpaces.map((space) => (
                <div key={space.id} className="space-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={getSpaceImage(space)} 
                      alt={space.name} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-bold text-lg">{space.name}</h3>
                        <p className="text-sm opacity-90">{space.price_per_hour ? `Starting at $${space.price_per_hour}/hour` : ''}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                      <span>{space.capacity ? `Up to ${space.capacity} people` : ''}</span>
                      {space.status === 'free' && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Available</span>
                      )}
                      {space.status === 'booked' && (
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">Booked</span>
                      )}
                    </div>
                    <Link to={`/spaces/${space.id}`} className="text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/spaces" className="inline-flex items-center justify-center bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 font-medium py-2 px-6 rounded-lg">
              View All Spaces
            </Link>
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
      <section className="section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="testimonials-wrapper bg-slate-50 rounded-xl p-4 md:p-6">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                showArrows={true}
                className="testimonial-carousel"
              >
                <div className="px-4 py-8 sm:px-6 sm:py-10 bg-white rounded-lg shadow-sm mx-2 my-4">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-blue-600 text-lg font-medium">SJ</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Sarah Johnson</div>
                      <div className="text-sm text-slate-500">Marketing Director</div>
                    </div>
                    <div className="ml-auto">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    "SmartSpace made finding and booking our company event space incredibly easy. 
                    The whole process took minutes instead of hours! We've been using it for all our events now."
                  </p>
                </div>
                
                <div className="px-4 py-8 sm:px-6 sm:py-10 bg-white rounded-lg shadow-sm mx-2 my-4">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-green-600 text-lg font-medium">MC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Michael Chen</div>
                      <div className="text-sm text-slate-500">Event Space Owner</div>
                    </div>
                    <div className="ml-auto">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    "As a venue owner, SmartSpace has helped me maximize bookings and 
                    streamline management. The platform is intuitive and reliable. My bookings have increased by 40%!"
                  </p>
                </div>
                
                <div className="px-4 py-8 sm:px-6 sm:py-10 bg-white rounded-lg shadow-sm mx-2 my-4">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-purple-600 text-lg font-medium">AK</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Aisha Khan</div>
                      <div className="text-sm text-slate-500">Startup Founder</div>
                    </div>
                    <div className="ml-auto">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    "Finding a flexible workspace for my growing team was a challenge until I discovered SmartSpace.
                    The variety of options and transparent pricing made the decision so much easier."
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-lg px-6 py-12 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              Join thousands of satisfied users who trust <span className="font-semibold text-white">SmartSpace</span> for their space needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={isAuthenticated ? "/spaces" : "/register"} 
                className="inline-flex items-center justify-center bg-white text-slate-900 hover:bg-slate-100 transition-all duration-200 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {isAuthenticated ? "Browse Spaces" : "Get Started Now"}
              </Link>
            </div>
            <div className="mt-8 flex justify-center space-x-10 border-t border-slate-700 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs text-slate-400">Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-xs text-slate-400">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs text-slate-400">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
