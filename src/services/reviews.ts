import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

// Review interfaces based on API documentation
export interface Review {
    id: number;
    space: number;
    user: number;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    created_at: string;
    updated_at: string;
    user_first_name: string;
    user_email?: string; // Keep for backward compatibility, but mark as optional
    space_name: string;
}

export interface ReviewCreate {
    space: number;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
}

// Axios instance with default config
const reviewsApi = axios.create({
    baseURL: `${API_BASE_URL}/spaces`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
reviewsApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Get all reviews
export const getAllReviews = async (): Promise<Review[]> => {
    try {
        const response = await reviewsApi.get('/reviews/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to fetch reviews' };
        }
        throw { detail: 'Network error' };
    }
};

// Get reviews for a specific space
export const getSpaceReviews = async (spaceId: number): Promise<Review[]> => {
    try {
        const response = await reviewsApi.get(`/${spaceId}/reviews/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to fetch space reviews' };
        }
        throw { detail: 'Network error' };
    }
};

// Get single review
export const getReviewById = async (id: number): Promise<Review> => {
    try {
        const response = await reviewsApi.get(`/reviews/${id}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to fetch review' };
        }
        throw { detail: 'Network error' };
    }
};

// Create new review
export const createReview = async (data: ReviewCreate): Promise<Review> => {
    try {
        const response = await reviewsApi.post('/reviews/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to create review' };
        }
        throw { detail: 'Network error' };
    }
};

// Create new review for a specific space
export const createSpaceReview = async (spaceId: number, data: ReviewCreate): Promise<Review> => {
    try {
        const response = await reviewsApi.post(`/${spaceId}/reviews/create/`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to create review' };
        }
        throw { detail: 'Network error' };
    }
};

// Update review
export const updateReview = async (id: number, data: Partial<ReviewCreate>): Promise<Review> => {
    try {
        if (!id) {
            throw { detail: 'Review ID is required' };
        }
        const response = await reviewsApi.patch(`/reviews/${id}/`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to update review' };
        }
        throw { detail: 'Network error' };
    }
};

// Delete review
export const deleteReview = async (id: number): Promise<void> => {
    try {
        if (!id) {
            throw { detail: 'Review ID is required' };
        }
        await reviewsApi.delete(`/reviews/${id}/`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { detail: 'Failed to delete review' };
        }
        throw { detail: 'Network error' };
    }
};

export default {
    getAllReviews,
    getSpaceReviews,
    getReviewById,
    createReview,
    createSpaceReview,
    updateReview,
    deleteReview
};
