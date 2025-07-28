import {apiPost, directFetch } from './apiClient';
import { API_BASE_URL } from './baseUrl';
import axios from 'axios';

// Event/Booking interfaces based on API documentation
export interface Event {
    id: number;
    event_name: string;
    start_datetime: string;
    end_datetime: string;
    organizer_name: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';
    space: number;
    space_name: string;
}

export interface EventList {
    id: number;
    event_name: string;
    start_datetime: string;
    end_datetime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';
    space_name: string;
}

export interface CreateEventData {
    event_name: string;
    start_datetime: string;
    end_datetime: string;
    organizer_name: string;
    organizer_email: string;
    event_type: 'meeting' | 'conference' | 'webinar' | 'workshop';
    attendance: number;
    space: number;
}

// Book a new event
export const bookEvent = async (data: CreateEventData): Promise<Event> => {
    try {
        console.log('Booking new event with data:', data);
        return await apiPost('/bookings/book/', data);
    } catch (error) {
        console.error('Error booking event:', error);
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to book event' };
        }
        throw { detail: 'Failed to book event' };
    }
};


// Direct method for forcing a fetch (debugging)
export const forceFetchMyEvents = async (): Promise<EventList[]> => {
    console.log('Force refreshing my events with direct API call');
    try {
        // Make a completely direct call without any middleware
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        // Use the base fetch function from our API client
        const response = await directFetch('/bookings/my-events/');
        
        // Extract the data array from the response
        const eventData = response?.data || response;
        console.log('Force fetch extracted data:', eventData);
        
        return Array.isArray(eventData) ? eventData : [];
    } catch (error) {
        console.error('Force refresh failed:', error);
        throw { detail: 'Failed to force refresh events' };
    }
};



// Get upcoming confirmed events
export const getUpcomingEvents = async (eventType?: 'meeting' | 'conference' | 'webinar' | 'workshop'): Promise<EventList[]> => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('No access token available for API request');
        throw { detail: 'Authentication required' };
    }
    
    try {
        console.log(`Fetching from: ${API_BASE_URL}/bookings/upcoming/`);
        
        const params = eventType ? { event_type: eventType } : {};
        const response = await axios({
            method: 'GET',
            url: `${API_BASE_URL}/bookings/upcoming/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params
        });
        
        console.log('Upcoming events response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                throw { detail: 'Authentication failed. Please log in again.' };
            }
            throw error.response?.data || { detail: 'Failed to fetch upcoming events' };
        }
        throw { detail: 'Network error' };
    }
};

// Get my confirmed events
export const getMyEvents = async (): Promise<EventList[]> => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('No access token available for API request');
        throw { detail: 'Authentication required' };
    }
    
    try {
        // Use full direct URL for debugging
        const fullUrl = `${API_BASE_URL}/bookings/my-events/`;
        console.log(`Fetching from: ${fullUrl} with token: ${token.substring(0, 10)}...`);
        
        // Use Axios directly for more control with explicit timeout
        const response = await axios({
            method: 'GET',
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // Add additional headers for debugging
                'X-Debug-Time': new Date().toISOString()
            },
            timeout: 10000, // 10 second timeout
            validateStatus: (status) => {
                // Log all status codes for debugging
                console.log('API response status code:', status);
                return true; // Don't reject any status codes here, we'll handle them below
            }
        });
        
        console.log('My events response:', response);
        console.log('My events data:', response.data);
        
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw { 
                detail: `Server returned ${response.status}: ${response.statusText}`,
                response: response
            };
        }
    } catch (error) {
        console.error('Error fetching my events:', error);
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                throw { detail: 'Authentication failed. Please log in again.' };
            }
            throw error.response?.data || { detail: 'Failed to fetch your events' };
        }
        throw { detail: 'Network error' };
    }
};


export default {
    bookEvent,
    getUpcomingEvents,
    getMyEvents,
};
