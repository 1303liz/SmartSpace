import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingForm from '../components/bookings/BookingForm';

const BookingFormPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New Booking - SmartSpace</title>
        <meta name="description" content="Create a new space booking" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Create New Booking</h1>
          <p className="mt-2 text-blue-700">
            Fill out the form below to book a space for your event or meeting.
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100 p-6">
          <BookingForm />
        </div>
      </div>
    </>
  );
};

export default BookingFormPage;