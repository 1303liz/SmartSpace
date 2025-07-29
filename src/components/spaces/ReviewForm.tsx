import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  spaceId: number;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
  isLoading?: boolean;
  initialRating?: number;
  initialComment?: string;
  isEdit?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  spaceId,
  onSubmit,
  isLoading = false,
  initialRating = 0,
  initialComment = '',
  isEdit = false
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [comment, setComment] = useState<string>(initialComment);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please provide a comment');
      return;
    }
    
    try {
      await onSubmit({
        rating,
        comment
      });
      
      // Reset form if not editing
      if (!isEdit) {
        setRating(0);
        setComment('');
      }
      setError(null);
    } catch (err: any) {
      setError(err.detail || 'Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {isEdit ? 'Edit Your Review' : 'Write a Review'}
      </h3>
      
      {/* Rating Stars */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Rating*
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                fill={value <= (hoverRating || rating) ? '#FBBF24' : 'none'}
                stroke={value <= (hoverRating || rating) ? '#FBBF24' : '#9CA3AF'}
                className="w-8 h-8 transition-colors"
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>
      </div>
      
      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment*
        </label>
        <div className="mt-1">
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience about this space..."
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEdit ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            <>{isEdit ? 'Update Review' : 'Submit Review'}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
