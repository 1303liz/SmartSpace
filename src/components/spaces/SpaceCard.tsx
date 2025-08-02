import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Space } from '../../services/spaces';
import conferenceHall from '../../assets/confrece hall.jpg';
import eventHall from '../../assets/event hall.jpg';
import lab from '../../assets/lab.jpg';
import { API_BASE_URL } from '../../services/baseUrl';

type SpaceCardProps = {
  space: Space;
};

// Helper function to get the full image URL
const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  // Remove '/api' from URL and use base domain for images
  const baseImageUrl = API_BASE_URL.replace('/api', '');
  // Make sure we're using consistent base URL format
  return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

// Fallback images for spaces that don't have images
const getSpaceImage = (space: Space) => {
  if (space.image1) return getImageUrl(space.image1);
  if (space.image2) return getImageUrl(space.image2);
  if (space.image3) return getImageUrl(space.image3);
  if (space.image4) return getImageUrl(space.image4);
  if (space.image5) return getImageUrl(space.image5);
  
  // Fallback based on capacity
  if (space.capacity > 100) return eventHall;
  if (space.capacity > 30) return conferenceHall;
  return lab;
};

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const [imageError, setImageError] = useState(false);
  // Always use getImageUrl for consistent URL formatting
  const imageUrl = imageError ? getSpaceImage(space) : (getImageUrl(space.image1) || getSpaceImage(space));

  const features = space.features ? space.features.split(',').map(f => f.trim()).filter(Boolean) : [];
  const equipment = space.equipment ? space.equipment.split(',').map(e => e.trim()).filter(Boolean) : [];
  const allFeatures = [...features, ...equipment].slice(0, 3); // Show max 3 features

  return (
    <div className="card group cursor-pointer">
      <Link to={`/spaces/${space.id}`}>
        {/* Image */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
          <img 
            src={imageUrl}
            alt={space.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Try fallback images in sequence if the current image fails
              console.log("Image error:", imageUrl);
              const target = e.target as HTMLImageElement;
              if (!imageError) {
                setImageError(true);
                if (space.image2) target.src = getImageUrl(space.image2) || '';
                else if (space.image3) target.src = getImageUrl(space.image3) || '';
                else if (space.image4) target.src = getImageUrl(space.image4) || '';
                else if (space.image5) target.src = getImageUrl(space.image5) || '';
                else if (space.capacity > 100) target.src = eventHall;
                else if (space.capacity > 30) target.src = conferenceHall;
                else target.src = lab;
              }
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              space.status === 'free' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {space.status === 'free' ? 'Available' : 'Booked'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
            {space.name}
          </h3>
          
          <div className="flex items-center text-slate-600 mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{space.location}</span>
          </div>

          <div className="flex items-center text-slate-600 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">Up to {space.capacity} people</span>
          </div>

          {/* Features */}
          {allFeatures.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {allFeatures.map((feature, index) => (
                  <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div>
                <span className="text-2xl font-bold text-slate-900">Ksh{space.price_per_day}/day</span>
              </div>
            </div>
            <div className="btn-primary text-sm px-5 py-2 whitespace-nowrap font-medium">
              <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpaceCard;
