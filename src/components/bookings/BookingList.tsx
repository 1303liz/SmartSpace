import React, { useEffect, useState } from 'react';
import { MessageSquare, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { useBookings } from '../../hooks/useBookings';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import FeedbackDialog from '../common/FeedbackDialog';
import { format } from 'date-fns';

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';

const statuses: BookingStatus[] = ['all', 'pending', 'confirmed', 'completed', 'cancelled', 'rejected'];

interface BookingListProps {
  statusFilter?: string;
  searchTerm?: string;
}

const BookingList: React.FC<BookingListProps> = ({ statusFilter: externalStatusFilter, searchTerm: externalSearchTerm }) => {
  const { myEvents, loading, error, fetchMyEvents } = useBookings();
  const [internalStatusFilter, setInternalStatusFilter] = useState<BookingStatus>('all');
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  // Use external filters if provided, otherwise use internal state
  const statusFilter = externalStatusFilter || internalStatusFilter;
  const searchTerm = externalSearchTerm || internalSearchTerm;
  
  useEffect(() => {
    fetchMyEvents();
  }, []);

  // Defensive: default to empty array if undefined
  const bookings = Array.isArray(myEvents) ? myEvents : [];

  // Map API fields to camelCase for UI
  const mappedBookings = bookings.map(b => ({
    id: b.id,
    eventName: b.event_name,
    status: b.status,
    spaceName: b.space_name,
    startDateTime: b.start_datetime,
    endDateTime: b.end_datetime,
  }));

  const filteredBookings = mappedBookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.eventName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'pending':
        return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'cancelled':
      case 'rejected':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'completed':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'cancelled':
      case 'rejected':
        return '✗';
      case 'completed':
        return '🎉';
      default:
        return '•';
    }
  };

  const handleFeedbackSubmit = async (feedbackData: any) => {
    console.log('Feedback submitted:', feedbackData);
    // Here you would send the feedback to your API
    setShowFeedback(false);
    setSelectedBooking(null);
  };

  const openFeedback = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowFeedback(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      {/* Filters - Only show if external filters aren't provided */}
      {!externalStatusFilter && !externalSearchTerm && (
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={internalStatusFilter}
                onChange={e => setInternalStatusFilter(e.target.value as BookingStatus)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Bookings
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by event name or organizer"
                value={internalSearchTerm}
                onChange={e => setInternalSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters to see more results.'
                : 'You haven\'t made any bookings yet.'
              }
            </p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {booking.eventName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{booking.spaceName}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Event booking</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                    <span className="mr-1">{getStatusIcon(booking.status)}</span>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {format(new Date(booking.startDateTime), 'EEEE, MMMM do, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600">Event Date</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {format(new Date(booking.startDateTime), 'h:mm a')} - {format(new Date(booking.endDateTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-600">Duration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Organizer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Status:</span> {booking.status}</p>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Space:</span> {booking.spaceName}</p>
                </div>
                <div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Booking ID:</span> #{booking.id}</p>
                </div>
              </div>
              
              {/* Actions */}
              {(booking.status === 'confirmed' || booking.status === 'completed') && (
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openFeedback(booking.id.toString())}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Share Feedback
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Feedback Dialog */}
      <FeedbackDialog
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false);
          setSelectedBooking(null);
        }}
        onSubmit={handleFeedbackSubmit}
        bookingId={selectedBooking || undefined}
        title="Rate Your Booking Experience"
      />
    </div>
  );
};

export default BookingList;

