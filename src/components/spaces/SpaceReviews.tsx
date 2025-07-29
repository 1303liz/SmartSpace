import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useReviews from '../../hooks/useReviews';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface SpaceReviewsProps {
  spaceId: number;
  className?: string;
}

const SpaceReviews: React.FC<SpaceReviewsProps> = ({ spaceId, className = '' }) => {
  const { isAuthenticated, user } = useAuth();
  const { reviews, averageRating, loading, error, addReview, updateReview, deleteReview } = useReviews(spaceId);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Check if user has already submitted a review
  const userReview = reviews.find(review => user && review.user === user.id);
  const canReview = isAuthenticated && !userReview;

  const handleSubmit = async (data: { rating: number; comment: string }) => {
    if (!isAuthenticated) {
      return;
    }
    
    setSubmitting(true);
    try {
      await addReview({
        space: spaceId,
        rating: data.rating as 1 | 2 | 3 | 4 | 5,
        comment: data.comment
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateReview = async (id: number, data: { rating: number; comment: string }) => {
    setSubmitting(true);
    try {
      if (!id || isNaN(id)) {
        throw new Error(`Invalid review ID: ${id}`);
      }
      await updateReview(id, {
        rating: data.rating as 1 | 2 | 3 | 4 | 5,
        comment: data.comment
      });
    } catch (err) {
      console.error('Failed to update review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (id: number) => {
    setSubmitting(true);
    try {
      if (!id || isNaN(id)) {
        throw new Error(`Invalid review ID: ${id}`);
      }
      await deleteReview(id);
    } catch (err) {
      console.error('Failed to delete review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Reviews and Ratings</h2>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {!loading && (
        <>
          {/* Review Form Section */}
          {canReview ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              {showForm ? (
                <ReviewForm
                  spaceId={spaceId}
                  onSubmit={handleSubmit}
                  isLoading={submitting}
                />
              ) : (
                <div className="text-center py-4">
                  <p className="mb-4 text-gray-600">Share your experience with this space</p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          ) : userReview ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center text-gray-700">
                You have already submitted a review for this space.
              </div>
            </div>
          ) : !isAuthenticated && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center text-gray-700">
                Please sign in to leave a review.
              </div>
            </div>
          )}
          
          {/* Reviews List */}
          <ReviewList
            reviews={reviews}
            averageRating={averageRating}
            spaceId={spaceId}
            onUpdate={handleUpdateReview}
            onDelete={handleDeleteReview}
            isLoading={submitting}
          />
        </>
      )}
    </div>
  );
};

export default SpaceReviews;
