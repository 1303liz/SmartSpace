import { useState, useEffect } from 'react';
import { getAllReviews, getSpaceReviews, createReview, createSpaceReview, updateReview, deleteReview } from '../services/reviews';
import type { Review, ReviewCreate } from '../services/reviews';
import { useAuth } from './useAuth';

export const useReviews = (spaceId?: number) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = spaceId 
        ? await getSpaceReviews(spaceId) 
        : await getAllReviews();
      
      setReviews(data);
      
      // Calculate average rating if there are reviews
      if (data.length > 0) {
        const total = data.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(parseFloat((total / data.length).toFixed(1)));
      } else {
        setAverageRating(null);
      }
    } catch (err: any) {
      setError(err.detail || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    } else {
      setReviews([]);
      setAverageRating(null);
    }
  }, [isAuthenticated, spaceId]);

  const addReview = async (reviewData: ReviewCreate): Promise<Review> => {
    try {
      setError(null);
      const newReview = spaceId 
        ? await createSpaceReview(spaceId, reviewData)
        : await createReview(reviewData);
      
      // Update reviews list
      setReviews(prev => [newReview, ...prev]);
      
      // Recalculate average
      const total = reviews.reduce((acc, review) => acc + review.rating, 0) + newReview.rating;
      setAverageRating(parseFloat((total / (reviews.length + 1)).toFixed(1)));
      
      return newReview;
    } catch (err: any) {
      setError(err.detail || 'Failed to add review');
      throw err;
    }
  };

  const updateExistingReview = async (id: number, reviewData: Partial<ReviewCreate>): Promise<Review> => {
    try {
      setError(null);
      const updatedReview = await updateReview(id, reviewData);
      
      // Update reviews list
      setReviews(prev => prev.map(review => review.id === id ? updatedReview : review));
      
      // Recalculate average
      const total = reviews.reduce((acc, review) => {
        if (review.id === id) {
          return acc + (updatedReview.rating || review.rating);
        }
        return acc + review.rating;
      }, 0);
      
      setAverageRating(parseFloat((total / reviews.length).toFixed(1)));
      
      return updatedReview;
    } catch (err: any) {
      setError(err.detail || 'Failed to update review');
      throw err;
    }
  };

  const removeReview = async (id: number): Promise<void> => {
    try {
      setError(null);
      await deleteReview(id);
      
      // Remove from reviews list
      const reviewToRemove = reviews.find(review => review.id === id);
      setReviews(prev => prev.filter(review => review.id !== id));
      
      // Recalculate average
      if (reviewToRemove && reviews.length > 1) {
        const total = reviews.reduce((acc, review) => {
          if (review.id !== id) return acc + review.rating;
          return acc;
        }, 0);
        setAverageRating(parseFloat((total / (reviews.length - 1)).toFixed(1)));
      } else {
        setAverageRating(null);
      }
    } catch (err: any) {
      setError(err.detail || 'Failed to delete review');
      throw err;
    }
  };

  return {
    reviews,
    averageRating,
    loading,
    error,
    fetchReviews,
    addReview,
    updateReview: updateExistingReview,
    deleteReview: removeReview
  };
};

export default useReviews;
