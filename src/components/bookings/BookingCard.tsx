import React from 'react';

type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

type Booking = {
  id: string;
  eventName: string;
  spaceName: string;
  status: BookingStatus;
  date: string;
  time: string;
};

interface BookingCardProps {
  booking: Booking;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  showDateTime?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onView,
  onEdit,
  onCancel,
  showDateTime = true,
}) => {
  // Get status color based on booking status
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{booking.eventName}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Space:</span> {booking.spaceName}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status as BookingStatus)}`}>
          {booking.status}
        </div>
      </div>

      {showDateTime && (
        <div className="mt-3 mb-4 flex flex-col space-y-1">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600">{booking.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">{booking.time}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4 border-t border-gray-100 pt-3">
        {onView && (
          <button
            onClick={() => onView(booking.id)}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            View
          </button>
        )}
        {onEdit && booking.status !== 'Cancelled' && (
          <button
            onClick={() => onEdit(booking.id)}
            className="px-3 py-1.5 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Edit
          </button>
        )}
        {onCancel && booking.status !== 'Cancelled' && (
          <button
            onClick={() => onCancel(booking.id)}
            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
