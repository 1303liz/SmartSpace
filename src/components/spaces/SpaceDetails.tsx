import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { API_BASE_URL } from '../../services/baseUrl';
import SpaceReviews from './SpaceReviews';

// Type definitions based on API response
type Space = {
  id: number;
  name: string;
  capacity: number;
  features: string;
  description?: string;
  status: string; // 'free' or other values
  price_per_day?: string; // Daily rate for full-day bookings
  location: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  equipment?: string;
  created_at: string;
  updated_at: string;
  organizer: number | null;
};

// Helper function to parse features string into array
const parseFeatures = (featuresString?: string): string[] => {
  if (!featuresString) return [];
  return featuresString.split(',').map(feature => feature.trim()).filter(Boolean);
};

// Helper function to get the image URL
const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  // Remove '/api' from URL and use base domain for images
  const baseImageUrl = API_BASE_URL.replace('/api', '');
  return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const SpaceDetails: React.FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);

  const handleBookNow = () => {
    navigate(`/bookings/new?space=${space?.id}`);
  };
  
  useEffect(() => {
    const fetchSpace = async () => {
      if (!spaceId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_BASE_URL}/spaces/${spaceId}/`);
        setSpace(response.data);
      } catch (error) {
        console.error("Error fetching space:", error);
        setError("Failed to load space details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpace();
  }, [spaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
        <div className="flex items-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">Error loading space</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/spaces" className="text-red-600 hover:text-red-800 font-medium">
            &larr; Return to spaces list
          </Link>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
        <div className="flex items-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">Space not found</p>
            <p className="text-sm text-red-600 mt-1">
              The requested space could not be found or may have been removed.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/spaces" className="text-red-600 hover:text-red-800 font-medium">
            &larr; Return to spaces list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/spaces" className="text-gray-500 hover:text-gray-700">Spaces</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{space.name}</span>
      </nav>

      {/* Space Details Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{space.name}</h1>
          <div className="flex flex-row items-center justify-between mt-2 text-xs sm:text-sm md:text-base text-gray-600 w-full">
            <div className="flex items-center flex-1 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{space.location}</span>
            </div>
            <div className="flex items-center flex-1 min-w-0 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="truncate">Capacity: {space.capacity}</span>
            </div>
            <div className="flex items-center flex-1 min-w-0 justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">Status: {space.status === 'free' ? 'Available' : 'Booked'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">Ksh{parseFloat(space.price_per_day ?? "0").toFixed(2)}/day</span>
            <span className="ml-1 text-gray-600">/hour</span>
          </div>
          {space.price_per_day && (
            <div className="flex items-center mt-1">
              <span className="text-lg font-semibold text-gray-800">Ksh{parseFloat(space.price_per_day).toFixed(2)}</span>
              <span className="ml-1 text-gray-600">/day</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {(() => {
          const images = [
            space.image1, 
            space.image2, 
            space.image3, 
            space.image4, 
            space.image5
          ].filter(Boolean).map(img => getImageUrl(img));
          
          if (images.length === 0) {
            return (
              <div className="h-96 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            );
          }
          
          const nextImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          };
          
          const prevImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
          };
          
          return (
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${space.name} - View ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                />
                
                {/* Image Navigation Controls */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
                
                {/* Fullscreen Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImageModal(true);
                  }}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
                  aria-label="View fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                </button>
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto py-2 px-1">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                        currentImageIndex === index 
                          ? 'border-gray-800 opacity-100' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image}
                        alt={`${space.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Fullscreen Modal */}
              {showImageModal && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setShowImageModal(false)}>
                  <div className="relative max-w-7xl w-full h-full flex flex-col">
                    {/* Modal Close Button */}
                    <button 
                      className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/30 rounded-full p-2 text-white transition"
                      onClick={() => setShowImageModal(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    {/* Main Modal Image */}
                    <div className="flex-1 flex items-center justify-center p-4">
                      <img 
                        src={images[currentImageIndex]}
                        alt={`${space.name} - View ${currentImageIndex + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    
                    {/* Modal Navigation Controls */}
                    {images.length > 1 && (
                      <div className="flex justify-between items-center p-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="bg-white/10 hover:bg-white/30 rounded-full p-3 text-white transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <div className="text-white text-lg font-medium">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="bg-white/10 hover:bg-white/30 rounded-full p-3 text-white transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Section */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features & Amenities
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">About this space</h3>
                <p className="text-gray-600 mb-4">{space.description || 'No description available.'}</p>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Space Specifications</h4>
                <div className="grid grid-cols-2 gap-y-2 bg-gray-50 rounded-lg p-4 border border-gray-200 mt-6">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-700">Capacity: {space.capacity} people</span>
                    </div>
                    {space.equipment && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">Equipment: {space.equipment}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Status: {space.status === 'free' ? 'Available' : 'Booked'}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">Created: {new Date(space.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Amenities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {parseFeatures(space.features).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {parseFeatures(space.features).length === 0 && (
                    <div className="col-span-2 text-gray-500">No features listed for this space.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {space && <SpaceReviews spaceId={space.id} />}
              </div>
            )}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Ksh{parseFloat(space.price_per_day ?? "0").toFixed(2)}/day
                <span className="text-base font-normal text-gray-600">/hour</span>
              </h3>
              {space.price_per_day && (
                <div className="mb-2">
                  <span className="text-lg font-semibold text-gray-900">Ksh{parseFloat(space.price_per_day).toFixed(2)}</span>
                  <span className="text-sm font-normal text-gray-600">/day</span>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{space.location}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Up to {space.capacity} people</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Secure booking process • Instant confirmation
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${space.status === 'free' ? 'text-green-600' : 'text-orange-600'}`}>
                    {space.status === 'free' ? 'Available' : 'Booked'}
                  </span>
                </div>
                
                {space.equipment && (
                  <div className="flex items-start justify-between text-sm">
                    <span className="text-gray-600">Equipment</span>
                    <span className="text-gray-900 text-right max-w-32">{space.equipment}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center">
              <span className="text-sm text-gray-500">
                Need help? <a href="#" className="text-indigo-600 hover:text-indigo-800">Contact support</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;
