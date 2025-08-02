import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

// Space interface based on API documentation
export interface Space {
    id: number;
    name: string;
    location: string;
    capacity: number;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    status: 'booked' | 'free';
    description?: string;
    equipment?: string;
    features?: string;
    price_per_day: string; // Daily rate for bookings
    created_at: string;
    updated_at: string;
}

export interface CreateSpaceData {
    name: string;
    location: string;
    capacity: number;
    description?: string;
    equipment?: string;
    features?: string;
    price_per_day: string; // Daily rate for bookings
}

// Axios instance with default config
const spacesApi = axios.create({
    baseURL: `${API_BASE_URL}/spaces`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth header if token exists
spacesApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Get all spaces
export const getSpaces = async (): Promise<Space[]> => {
    try {
        const response = await spacesApi.get('/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to fetch spaces' };
        }
        throw { detail: 'Network error' };
    }
};

// Get space by ID
export const getSpaceById = async (id: number): Promise<Space> => {
    try {
        const response = await spacesApi.get(`/${id}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to fetch space' };
        }
        throw { detail: 'Network error' };
    }
};

// Create new space
export const createSpace = async (data: CreateSpaceData): Promise<Space> => {
    try {
        const response = await spacesApi.post('/create/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to create space' };
        }
        throw { detail: 'Network error' };
    }
};

// Update space
export const updateSpace = async (id: number, data: Partial<CreateSpaceData>): Promise<Space> => {
    try {
        const response = await spacesApi.patch(`/${id}/`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to update space' };
        }
        throw { detail: 'Network error' };
    }
};

// Delete space
export const deleteSpace = async (id: number): Promise<void> => {
    try {
        await spacesApi.delete(`/${id}/`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to delete space' };
        }
        throw { detail: 'Network error' };
    }
};

export default {
    getSpaces,
    getSpaceById,
    createSpace,
    updateSpace,
    deleteSpace,
};
