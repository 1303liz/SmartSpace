import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { useSpaces } from '../hooks/useSpaces';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { myEvents, loading, error, fetchMyEvents, refetch } = useBookings();
  const { spaces = [], refetch: spacesRefetch } = useSpaces();

  useEffect(() => {
    if (typeof refetch === 'function') {
      refetch();
    } else if (typeof fetchMyEvents === 'function') {
      fetchMyEvents();
    }
    if (typeof spacesRefetch === 'function') {
      spacesRefetch();
    }
  }, []);

  const myEventsArray = Array.isArray(myEvents) ? myEvents : [];
  const today = new Date();
  // Filter upcoming events for the current user
  const userUpcomingBookings = myEventsArray.filter(event => 
    new Date(event.start_datetime) >= today && 
    (event.status === 'confirmed' || event.status === 'pending')
  ).slice(0, 3);

  // Calculate statistics
  const totalBookings = myEventsArray.length;
  const confirmedBookings = myEventsArray.filter(event => event.status === 'confirmed').length;
  const totalHoursBooked = myEventsArray.reduce((sum, event) => {
    if (event.status === 'confirmed' || event.status === 'completed') {
      const start = new Date(event.start_datetime);
      const end = new Date(event.end_datetime);
      return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }
    return sum;
  }, 0);

  const calculateTotalSpent = () => {
    if (!myEventsArray || !spaces) return 0;
    return myEventsArray.reduce((sum, event) => {
      const space = spaces.find(s => s.name === event.space_name);
      if (space && (event.status === 'confirmed' || event.status === 'completed')) {
        const duration = (new Date(event.end_datetime).getTime() - new Date(event.start_datetime).getTime()) / (1000 * 60 * 60);
        return sum + (parseFloat(space.price_per_hour) * duration);
      }
      return sum;
    }, 0);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.fullName || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your booking activity and upcoming events.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-gray-200 px-3 py-4 sm:p-6 flex items-center min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalBookings}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{confirmedBookings} confirmed</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-gray-200 px-3 py-4 sm:p-6 flex items-center min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Upcoming Events</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">{userUpcomingBookings.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Next 30 days</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-gray-200 px-3 py-4 sm:p-6 flex items-center min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Hours Booked</p>
              <p className="text-lg sm:text-2xl font-bold text-purple-600">{Math.round(totalHoursBooked)}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Total hours</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl border border-gray-200 px-3 py-4 sm:p-6 flex items-center min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <span className="text-emerald-600 font-bold text-base sm:text-lg">$</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Spent</p>
              <p className="text-lg sm:text-2xl font-bold text-emerald-600">${calculateTotalSpent().toFixed(0)}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">All time</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <Link 
                  to="/bookings" 
                  className="text-gray-900 hover:text-gray-700 text-sm font-medium flex items-center gap-1 transition-colors border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {myEvents && myEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {myEvents.slice(0, 3).map((event) => {
                    const dateTime = formatDateTime(event.start_datetime);
                    return (
                      <div key={event.id} className="flex flex-col h-full justify-between p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors min-w-0">
                        <div className="flex items-center gap-3 mb-2 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 text-base sm:text-lg truncate">{event.event_name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{event.space_name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{dateTime.date} • {dateTime.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                          <Link 
                            to="/bookings"
                            className="text-xs font-medium text-black hover:text-gray-700" 
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-3">No bookings yet</p>
                  <Link 
                    to="/spaces" 
                    className="text-gray-900 hover:text-gray-700 text-sm font-medium"
                  >
                    Browse Spaces
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Upcoming Events */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  to="/spaces" 
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Book a Space
                </Link>
                <Link 
                  to="/bookings" 
                  className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Manage Bookings
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <div className="p-6">
                {userUpcomingBookings && userUpcomingBookings.length > 0 ? (
                  <div className="space-y-3">
                    {userUpcomingBookings.map((event) => {
                      const dateTime = formatDateTime(event.start_datetime);
                      return (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{event.event_name}</p>
                            <p className="text-xs text-gray-500">{event.space_name}</p>
                            <p className="text-xs text-gray-500">{dateTime.date} at {dateTime.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
