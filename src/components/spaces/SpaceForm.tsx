import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type SpaceFormData = {
  name: string;
  description: string;
  location: string;
  capacity: string;
  pricePerHour: string;
  fullDayPrice: string;
  features: string[];
  availabilityStart: string;
  availabilityEnd: string;
};

type FormErrors = {
  [key: string]: string;
};

const initialFormData: SpaceFormData = {
  name: '',
  description: '',
  location: '',
  capacity: '',
  pricePerHour: '',
  fullDayPrice: '',
  features: [],
  availabilityStart: '09:00',
  availabilityEnd: '17:00'
};

// Available features that can be selected
const availableFeatures = [
  'Projector',
  'Videoconferencing',
  'Whiteboard',
  'High-speed Wi-Fi',
  'Natural lighting',
  'Adjustable climate control',
  'Ergonomic chairs',
  'Coffee/Tea service',
  'Catering available',
  'AV equipment',
  'Microphones',
  'Podium/Stage',
  'Accessible entrance',
  'Parking nearby',
  'Water service'
];

const SpaceForm: React.FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SpaceFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're editing an existing space
  const isEditMode = !!spaceId;

  useEffect(() => {
    // If in edit mode, fetch the space data
    if (isEditMode) {
      setIsLoading(true);
      
      // For a real app, this would be an API call:
      // fetch(`/api/spaces/${spaceId}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     setFormData({
      //       name: data.name,
      //       description: data.description,
      //       location: data.location,
      //       capacity: data.capacity.toString(),
      //       pricePerHour: data.pricePerHour.toString(),
      //       fullDayPrice: data.fullDayPrice.toString(),
      //       features: data.features,
      //       availabilityStart: data.availabilityStart,
      //       availabilityEnd: data.availabilityEnd,
      //     });
      //   })
      //   .catch(error => {
      //     console.error('Error fetching space data:', error);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
      
      // Mock data for demo purposes
      setTimeout(() => {
        setFormData({
          name: 'Conference Room A',
          description: 'A spacious conference room ideal for large meetings and presentations.',
          location: 'Main Building, 1st Floor',
          capacity: '50',
          pricePerHour: '75',
          fullDayPrice: '500',
          features: ['Projector', 'Videoconferencing', 'Whiteboard', 'High-speed Wi-Fi'],
          availabilityStart: '09:00',
          availabilityEnd: '17:00'
        });
        setIsLoading(false);
      }, 800);
    }
  }, [spaceId, isEditMode]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      if (prev.features.includes(feature)) {
        return { ...prev, features: prev.features.filter(f => f !== feature) };
      } else {
        return { ...prev, features: [...prev.features, feature] };
      }
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Space name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number';
    }
    
    if (!formData.pricePerHour.trim()) {
      newErrors.pricePerHour = 'Price per hour is required';
    } else if (isNaN(Number(formData.pricePerHour)) || Number(formData.pricePerHour) < 0) {
      newErrors.pricePerHour = 'Price must be a valid number';
    }
    
    if (!formData.fullDayPrice.trim()) {
      newErrors.fullDayPrice = 'Full day price is required';
    } else if (isNaN(Number(formData.fullDayPrice)) || Number(formData.fullDayPrice) < 0) {
      newErrors.fullDayPrice = 'Price must be a valid number';
    }
    
    if (formData.features.length === 0) {
      newErrors.features = 'Select at least one feature';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare data for submission
    const spaceData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      price_per_hour: parseFloat(formData.pricePerHour).toString(),
      price_per_day: parseFloat(formData.fullDayPrice).toString()
    };
    
    // For a real app, this would be an API call:
    // const apiCall = isEditMode
    //   ? fetch(`/api/spaces/${spaceId}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(spaceData)
    //     })
    //   : fetch('/api/spaces', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(spaceData)
    //     });
    
    // apiCall
    //   .then(response => response.json())
    //   .then(data => {
    //     // Navigate to the space details page or spaces list
    //     navigate(isEditMode ? `/spaces/${spaceId}` : '/spaces');
    //   })
    //   .catch(error => {
    //     console.error('Error saving space:', error);
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false);
    //   });
    
    // Simulate API call for demo
    setTimeout(() => {
      console.log('Space data submitted:', spaceData);
      setIsSubmitting(false);
      navigate('/spaces');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit Space' : 'Create New Space'}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Details</h2>
            </div>
            
            {/* Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Space Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., Conference Room A"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Describe the space and its main features..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., Main Building, 1st Floor"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
            
            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity (people)*
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., 50"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
              )}
            </div>
            
            {/* Pricing */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Pricing</h2>
            </div>
            
            {/* Price Per Hour */}
            <div>
              <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">
                Price Per Hour ($)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="pricePerHour"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2 border ${
                    errors.pricePerHour ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g., 75.00"
                />
              </div>
              {errors.pricePerHour && (
                <p className="mt-1 text-sm text-red-600">{errors.pricePerHour}</p>
              )}
            </div>
            
            {/* Full Day Price */}
            <div>
              <label htmlFor="fullDayPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Full Day Price ($)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  id="fullDayPrice"
                  name="fullDayPrice"
                  value={formData.fullDayPrice}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-3 py-2 border ${
                    errors.fullDayPrice ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g., 500.00"
                />
              </div>
              {errors.fullDayPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.fullDayPrice}</p>
              )}
            </div>
            
            {/* Availability Hours */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Default Availability Hours</h2>
            </div>
            
            <div>
              <label htmlFor="availabilityStart" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <select
                id="availabilityStart"
                name="availabilityStart"
                value={formData.availabilityStart}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="availabilityEnd" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <select
                id="availabilityEnd"
                name="availabilityEnd"
                value={formData.availabilityEnd}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
            
            {/* Features */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Features & Amenities*</h2>
              <p className="text-sm text-gray-500 mb-4">Select all features available in this space</p>
              
              {errors.features && (
                <p className="mb-2 text-sm text-red-600">{errors.features}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature}`}
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Upload - Would normally use a proper image upload component */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Space Photos</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <div className="mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    Upload Photos
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="md:col-span-2 mt-8 flex justify-end">
              <button
                type="button"
                className="px-6 py-2 mr-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                onClick={() => navigate('/spaces')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  isEditMode ? 'Update Space' : 'Create Space'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpaceForm;
