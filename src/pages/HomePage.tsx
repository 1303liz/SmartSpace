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

const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  const baseImageUrl = API_BASE_URL.replace('/api', '');
  return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

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
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
  const [featuredSpaces, setFeaturedSpaces] = useState<Space[]>([]);
  const [spacesLoading, setSpacesLoading] = useState(false);
  const [spacesError, setSpacesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      setSpacesLoading(true);
      setSpacesError(null);
      try {
        const allSpaces = await getSpaces();
        const shuffled = allSpaces.sort(() => 0.5 - Math.random());
        setFeaturedSpaces(shuffled.slice(0, 3));

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto p-6 md:p-0 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                <span>Discover Your</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
                  Ideal Workspace
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Premium spaces for meetings, events, and creative work. 
                Book instantly with our seamless platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/spaces" 
                  className="bg-white text-blue-800 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Browse Spaces
                </Link>
                {!isAuthenticated && (
                  <Link 
                    to="/register" 
                    className="border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-all"
                  >
                    Join Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-carousel h-[550px] md:h-[600px] w-full">
          <ImageCarousel 
            images={carouselImages} 
            showIndicators={true}
            autoPlay={true}
            interval={7000}
            showThumbs={false}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              How It Works
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mb-6"></div>
            <p className="text-lg text-blue-800/80 max-w-2xl mx-auto">
              Simple steps to find and book your perfect space
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Explore Spaces",
                description: "Browse our curated collection of professional venues for every need"
              },
              {
                step: "2",
                title: "Instant Booking",
                description: "Real-time availability with immediate confirmation"
              },
              {
                step: "3",
                title: "Focus on Work",
                description: "Arrive and concentrate while we handle the logistics"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 mx-auto text-white text-2xl font-bold">
                  {feature.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-blue-900">
                  {feature.title}
                </h3>
                <p className="text-blue-800/80 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              Featured Spaces
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mb-6"></div>
            <p className="text-lg text-blue-800/80 max-w-2xl mx-auto">
              Our most popular and highly-rated venues
            </p>
          </div>

          {spacesLoading ? (
            <div className="text-center py-10 text-blue-800/60">Loading featured spaces...</div>
          ) : spacesError ? (
            <div className="text-center py-10 text-red-500">{spacesError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredSpaces.map((space) => (
                <div key={space.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={getSpaceImage(space)} 
                      alt={space.name} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent flex items-end p-4">
                      <div>
                        <h3 className="font-bold text-xl text-white">{space.name}</h3>
                        <p className="text-blue-200">
                          {space.price_per_day ? `Ksh${space.price_per_day}/day` : 'Price on request'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-blue-800/80">
                        {space.capacity ? `Capacity: ${space.capacity}` : ''}
                      </span>
                      {space.status === 'free' ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Booked</span>
                      )}
                    </div>
                    <Link 
                      to={`/spaces/${space.id}`} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/spaces" 
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              View All Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "500+", label: "Spaces Available" },
              { value: "10K+", label: "Happy Customers" },
              { value: "50+", label: "Cities Covered" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
              What Our Clients Say
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mb-6"></div>
            <p className="text-lg text-blue-800/80 max-w-2xl mx-auto">
              Trusted by professionals across industries
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              interval={6000}
              showArrows={true}
              className="testimonial-carousel"
            >
              {[
                {
                  initials: "SJ",
                  name: "Sarah Johnson",
                  role: "Marketing Director",
                  quote: "SmartSpace made finding our event venue effortless. We've used it for all our corporate events with perfect results every time.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  initials: "MC",
                  name: "Michael Chen",
                  role: "Startup Founder",
                  quote: "As a growing company, we need flexible workspaces. SmartSpace delivers quality options with transparent pricing.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  initials: "AK",
                  name: "Aisha Khan",
                  role: "Event Planner",
                  quote: "Booking venues used to take days of back-and-forth. Now I can secure spaces instantly through SmartSpace.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                }
              ].map((testimonial, index) => (
                <div key={index} className="px-6 py-8 bg-blue-50 rounded-lg mx-2">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-4`}>
                      <span className={`${testimonial.textColor} font-medium`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">{testimonial.name}</div>
                      <div className="text-sm text-blue-600/80">{testimonial.role}</div>
                    </div>
                    <div className="ml-auto flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-800/90 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;