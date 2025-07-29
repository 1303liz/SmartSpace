import React, { useState } from 'react';
import { Star, MoreVertical, Edit2, Trash, X } from 'lucide-react';
import { format } from 'date-fns';
import type { Review } from '../../services/reviews';
import { useAuth } from '../../hooks/useAuth';
import ReviewForm from './ReviewForm';

interface ReviewListProps {
  reviews: Review[];
  averageRating: number | null;
  spaceId?: number;
  onUpdate: (id: number, data: { rating: number; comment: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  averageRating,
  spaceId,
  onUpdate,
  onDelete,
  isLoading = false
}) => {
  const { user } = useAuth();
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const isUserReview = (review: Review) => {
    return user && user.id === review.user;
  };

  const handleEditClick = (reviewId: number) => {
    setEditingReviewId(reviewId);
    setMenuOpenId(null);
  };

  const handleDeleteClick = (reviewId: number) => {
    setDeleteConfirmId(reviewId);
    setMenuOpenId(null);
  };

  const handleUpdateSubmit = async (reviewId: number, data: { rating: number; comment: string }) => {
    if (!reviewId || isNaN(reviewId)) {
      console.error('Invalid review ID for update:', reviewId);
      return;
    }
    await onUpdate(reviewId, data);
    setEditingReviewId(null);
  };

  const handleDeleteConfirm = async (reviewId: number) => {
    if (!reviewId || isNaN(reviewId)) {
      console.error('Invalid review ID for delete:', reviewId);
      return;
    }
    await onDelete(reviewId);
    setDeleteConfirmId(null);
  };

  const toggleMenu = (reviewId: number) => {
    setMenuOpenId(menuOpenId === reviewId ? null : reviewId);
  };

  // Render stars for rating display
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            fill={star <= rating ? '#FBBF24' : 'none'}
            stroke={star <= rating ? '#FBBF24' : '#9CA3AF'}
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
          {averageRating !== null && reviews.length > 0 && (
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">
                {renderRatingStars(Math.round(averageRating))}
              </div>
              <span className="text-lg font-medium text-gray-900">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No reviews yet. Be the first to leave a review!
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={`review-${review.id}`} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              {editingReviewId === review.id ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ReviewForm
                    spaceId={review.space}
                    onSubmit={(data) => handleUpdateSubmit(review.id, data)}
                    isLoading={isLoading}
                    initialRating={review.rating}
                    initialComment={review.comment}
                    isEdit={true}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingReviewId(null)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                          {review.user_first_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{review.user_first_name}</p>
                        <div className="flex items-center mt-1">
                          {renderRatingStars(review.rating)}
                          <span className="ml-2 text-xs text-gray-500">
                            {review.created_at && format(new Date(review.created_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu (only for user's own reviews) */}
                    {isUserReview(review) && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleMenu(review.id)}
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {menuOpenId === review.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                            <button
                              type="button"
                              onClick={() => handleEditClick(review.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit Review
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(review.id)}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Review
                            </button>
                          </div>
                        )}

                        {/* Delete Confirmation */}
                        {deleteConfirmId === review.id && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-gray-900">Delete Review</h3>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                              <div className="mt-3">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to delete this review? This action cannot be undone.
                                </p>
                              </div>
                              <div className="mt-5 flex justify-end space-x-3">
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteConfirm(review.id)}
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                  disabled={isLoading}
                                >
                                  {isLoading ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-700">{review.comment}</div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
