import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Search, Filter, ChevronDown } from 'lucide-react';
import BookingForm from '../components/bookings/BookingForm';
import BookingList from '../components/bookings/BookingList';
import { useBookings } from '../hooks/useBookings';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookingsPage: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { loading, error, refetch } = useBookings();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!showBookingForm ? (
        // Bookings List View
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-gray-600 mt-1">Manage and track all your space bookings</p>
              </div>
              <div>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="inline-flex items-center px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium text-white bg-black hover:bg-gray-800 rounded-xl transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Booking
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Filters Header */}
              <div className="border-b border-gray-200 p-4 sm:p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      placeholder="Search by event name or space"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <div className="sm:w-48">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking List */}
              <div className="p-4 sm:p-6">
                <BookingList statusFilter={statusFilter} searchTerm={searchTerm} />
              </div>
            </div>
          )}
        </div>
      ) : (
        // Booking Form View
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowBookingForm(false)}
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookings
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Booking</h1>
              <p className="text-gray-600">Fill out the details below to reserve your space.</p>
            </div>
            <div className="p-4 sm:p-6">
              <BookingForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
