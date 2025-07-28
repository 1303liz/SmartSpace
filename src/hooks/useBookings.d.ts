import type { Event, EventList, CreateEventData } from '../services/bookings';

export interface UseBookingsReturn {
  myEvents: EventList[];
  upcomingEvents: EventList[];
  loading: boolean;
  error: string | null;
  fetchMyEvents: () => Promise<void>;
  fetchUpcomingEvents: () => Promise<void>;
  createBooking: (eventData: CreateEventData) => Promise<Event>;
  refetch: () => void;
}

export declare function useBookings(): UseBookingsReturn;
