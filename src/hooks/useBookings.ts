import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/services/baseUrl';
import type { Event, EventList, CreateEventData } from '../services/bookings';
import { useAuth } from './useAuth';

export const useBookings = () => {
  const { isAuthenticated } = useAuth();
  const [myEvents, setMyEvents] = useState<EventList[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No authentication token found');
      const response = await axios.get(`${API_BASE_URL}/bookings/my-events/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Handle different response formats - extract data array if wrapped
      const eventData = response.data?.data || response.data;
      console.log('Fetched events data:', eventData);
      
      // Set events state with the data array
      setMyEvents(Array.isArray(eventData) ? eventData : []);
    } catch (err: any) {
      setError(err.detail || err.message || 'Failed to fetch your events');
    } finally {
      setLoading(false);
    }
  };


  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No authentication token found');
      const response = await axios.get(`${API_BASE_URL}/bookings/upcoming/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Handle different response formats - extract data array if wrapped
      const eventData = response.data?.data || response.data;
      console.log('Fetched upcoming events data:', eventData);
      
      // Set events state with the data array
      setUpcomingEvents(Array.isArray(eventData) ? eventData : []);
    } catch (err: any) {
      setError(err.detail || err.message || 'Failed to fetch upcoming events');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (eventData: CreateEventData): Promise<Event> => {
    try {
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No authentication token found');
      const response = await axios.post(`${API_BASE_URL}/bookings/book/`, eventData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      await fetchMyEvents();
      await fetchUpcomingEvents();
      return response.data;
    } catch (err: any) {
      setError(err.detail || err.message || 'Failed to book event');
      throw err;
    }
  };

  // Run initial fetch when the hook is first used
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, fetching bookings data');
      fetchMyEvents();
      fetchUpcomingEvents();
    } else {
      console.log('User not authenticated, skipping bookings fetch');
      setMyEvents([]);
      setUpcomingEvents([]);
    }
  }, [isAuthenticated]); // Re-run when authentication state changes

  return {
    myEvents,
    upcomingEvents,
    loading,
    error,
    fetchMyEvents,
    fetchUpcomingEvents,
    createBooking,
    refetch: () => {
      fetchMyEvents();
      fetchUpcomingEvents();
    },
  };
};
