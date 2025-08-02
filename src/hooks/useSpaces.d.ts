export interface Space {
  id: string;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  amenities?: string[];
  image_url?: string;
  price_per_day?: number; // Daily rate for bookings
}

export interface UseSpacesReturn {
  spaces: Space[];
  loading: boolean;
  error: string | null;
  fetchSpaces: () => Promise<void>;
  createSpace: (spaceData: any) => Promise<void>;
  updateSpace: (id: string, spaceData: any) => Promise<void>;
  deleteSpace: (id: string) => Promise<void>;
}

export declare function useSpaces(): UseSpacesReturn;
