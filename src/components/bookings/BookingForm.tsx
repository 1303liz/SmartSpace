import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useSpaces } from '../../hooks/useSpaces';
import { useBookings } from '../../hooks/useBookings';
import PaymentModal from './PaymentModal';

interface BookingFormData {
  eventName: string;
  spaceId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isFullDay: boolean;
  attendees: number;
  organizerName: string;
  organizerEmail: string;
  eventType: 'meeting' | 'conference' | 'webinar' | 'workshop';
}

const initialFormState: BookingFormData = {
  eventName: '',
  spaceId: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  isFullDay: false,
  attendees: 1,
  organizerName: '',
  organizerEmail: '',
  eventType: 'meeting',
};

const calculateDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const days = Math.max(1, diffInDays); // Minimum 1 day
  
  return `${days} day${days !== 1 ? 's' : ''}`;
};

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { spaces, loading: spacesLoading } = useSpaces();
  const { createBooking, loading: bookingLoading } = useBookings();
  
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  // Pre-fill form if space is selected via URL params
  useEffect(() => {
    const spaceId = searchParams.get('space');
    if (spaceId && spaces.length > 0) {
      setForm(prev => ({ ...prev, spaceId }));
    }
  }, [searchParams, spaces]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.eventName.trim()) newErrors.eventName = 'Event name is required';
    if (!form.spaceId) newErrors.spaceId = 'Space selection is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.isFullDay && !form.startTime) newErrors.startTime = 'Start time is required';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    if (!form.isFullDay && !form.endTime) newErrors.endTime = 'End time is required';
    if (!form.organizerName.trim()) newErrors.organizerName = 'Organizer name is required';
    if (!form.organizerEmail.trim()) newErrors.organizerEmail = 'Organizer email is required';
    if (form.attendees < 1) newErrors.attendees = 'At least one attendee required';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.organizerEmail && !emailRegex.test(form.organizerEmail)) {
      newErrors.organizerEmail = 'Please enter a valid email address';
    }

    // Validate time logic
    if (!form.isFullDay && form.startTime && form.endTime && form.startDate === form.endDate && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    // Validate dates
    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start date not in past
    if (startDate < today) {
      newErrors.startDate = 'Start date cannot be in the past';
    }
    
    // End date not before start date
    if (endDate < startDate) {
      newErrors.endDate = 'End date cannot be before start date';
    }

    // Validate space capacity
    if (form.spaceId && form.attendees) {
      const selectedSpace = spaces.find(space => space.id.toString() === form.spaceId);
      if (selectedSpace && form.attendees > selectedSpace.capacity) {
        newErrors.attendees = `This space can only accommodate up to ${selectedSpace.capacity} people`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Calculate total amount
    const selectedSpace = spaces.find(space => space.id.toString() === form.spaceId);
    if (!selectedSpace) return;

    // Prepare booking data for payment
    const startDateTime = form.isFullDay ? `${form.startDate}T00:00:00` : `${form.startDate}T${form.startTime}:00`;
    const endDateTime = form.isFullDay ? `${form.endDate}T23:59:59` : `${form.endDate}T${form.endTime}:00`;
    
    const bookingData = {
      event_name: form.eventName,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
      start_date: form.startDate,
      end_date: form.endDate,
      is_full_day: form.isFullDay,
      organizer_name: form.organizerName,
      organizer_email: form.organizerEmail,
      event_type: form.eventType,
      attendance: form.attendees,
      space: parseInt(form.spaceId)
    };

    // Store booking data and show payment modal
    setPendingBookingData(bookingData);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      // Add payment information to booking data
      const finalBookingData = {
        ...pendingBookingData,
        payment_method: paymentData.method,
        transaction_id: paymentData.transactionId,
        amount_paid: paymentData.amount
      };

      await createBooking(finalBookingData);
      setShowPaymentModal(false);
      setSuccess('Booking and payment completed successfully! You will receive a confirmation email.');
      setForm(initialFormState);
      setErrors({});
      setPendingBookingData(null);
      
      // Navigate to bookings list after success
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (error: any) {
      setShowPaymentModal(false);
      setErrors({ submit: error.detail || 'Booking failed after payment. Please contact support with your transaction ID: ' + paymentData.transactionId });
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedSpace = spaces.find(space => space.id.toString() === form.spaceId);
  const isCapacityExceeded = selectedSpace && form.attendees > selectedSpace.capacity;

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Booking Submitted!</h3>
        <p className="text-gray-600 mb-6">{success}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-medium"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-800 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Event Details Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-700" />
            Event Details
          </h3>
          <p className="text-sm text-gray-600 mt-1">Basic information about your event</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name *
            </label>
            <input
              type="text"
              value={form.eventName}
              onChange={(e) => handleInputChange('eventName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.eventName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter event name"
            />
            {errors.eventName && <p className="mt-2 text-sm text-red-600">{errors.eventName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type *
            </label>
            <select
              value={form.eventType}
              onChange={(e) => handleInputChange('eventType', e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white"
            >
              <option value="meeting">Meeting</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Attendees *
            </label>
            <input
              type="number"
              min="1"
              value={form.attendees}
              onChange={(e) => handleInputChange('attendees', parseInt(e.target.value) || 1)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.attendees || isCapacityExceeded ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.attendees && <p className="mt-2 text-sm text-red-600">{errors.attendees}</p>}
            {isCapacityExceeded && !errors.attendees && (
              <p className="mt-2 text-sm text-red-600">
                Exceeds space capacity of {selectedSpace?.capacity} people
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Space Selection */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-700" />
            Space Selection
          </h3>
          <p className="text-sm text-gray-600 mt-1">Choose the perfect space for your event</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Space *
          </label>
          <select
            value={form.spaceId}
            onChange={(e) => handleInputChange('spaceId', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white ${
              errors.spaceId ? 'border-red-300' : 'border-gray-300'
            }`}
            disabled={spacesLoading}
          >
            <option value="">Choose a space</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.name} (Capacity: {space.capacity} people)
              </option>
            ))}
          </select>
          {errors.spaceId && <p className="mt-2 text-sm text-red-600">{errors.spaceId}</p>}
          
          {selectedSpace && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-700 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedSpace.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedSpace.location}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Up to {selectedSpace.capacity} people</span>
                    </div>
                    <div className="text-emerald-600 font-medium">
                      Ksh{selectedSpace.price_per_day}/day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date & Time Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-700" />
            Date & Time
          </h3>
          <p className="text-sm text-gray-600 mt-1">When would you like to book this space?</p>
        </div>
        
        {/* Full Day Toggle */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="isFullDay"
              type="checkbox"
              checked={form.isFullDay}
              onChange={(e) => handleInputChange('isFullDay', e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isFullDay" className="ml-2 text-sm font-medium text-gray-700">
              Full day event
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.startDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              min={form.startDate || new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.endDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        {!form.isFullDay && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time *
              </label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                  errors.startTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.startTime && <p className="mt-2 text-sm text-red-600">{errors.startTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                  errors.endTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.endTime && <p className="mt-2 text-sm text-red-600">{errors.endTime}</p>}
            </div>
          </div>
        )}

        {/* Duration Display */}
        {form.startDate && form.endDate && (
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-700">
                <>Your booking duration: <strong>{calculateDuration(form.startDate, form.endDate)}</strong></>
              </span>
              {selectedSpace && (
                <span className="text-emerald-800 font-medium">
                  Total: Ksh{(parseFloat(selectedSpace.price_per_day) * Math.max(1, Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24)))).toFixed(0)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Organizer Details */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-700" />
            Organizer Details
          </h3>
          <p className="text-sm text-gray-600 mt-1">Contact information for the event organizer</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Name *
            </label>
            <input
              type="text"
              value={form.organizerName}
              onChange={(e) => handleInputChange('organizerName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.organizerName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter organizer name"
            />
            {errors.organizerName && <p className="mt-2 text-sm text-red-600">{errors.organizerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Email *
            </label>
            <input
              type="email"
              value={form.organizerEmail}
              onChange={(e) => handleInputChange('organizerEmail', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                errors.organizerEmail ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter organizer email"
            />
            {errors.organizerEmail && <p className="mt-2 text-sm text-red-600">{errors.organizerEmail}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-8 border-t border-gray-200">
        <button
          type="submit"
          disabled={bookingLoading || isCapacityExceeded}
          className="inline-flex items-center gap-3 bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
        >
          {bookingLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              Continue to Payment
            </>
          )}
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedSpace && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
          bookingData={{
            totalAmount: parseFloat(selectedSpace.price_per_day) * Math.max(1, Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24))),
            duration: calculateDuration(form.startDate, form.endDate),
            spaceName: selectedSpace.name,
            organizerName: form.organizerName
          }}
        />
      )}
    </form>
  );
};

export default BookingForm;
