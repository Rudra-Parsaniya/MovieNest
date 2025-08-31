
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface Review {
  reviewId: number;
  userId: number;
  movieId: number;
  content: string;
  createdAt: string;
  user?: { userName: string };
}

interface MovieReviewsProps {
  movieId: number;
}

export const MovieReviews: React.FC<MovieReviewsProps> = ({ movieId }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.role === 'admin';

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/ReviewAPI?movieId=${movieId}`);
      setReviews(res.data);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [movieId]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !user) return;
    try {
      await axios.post('/api/ReviewAPI', {
        userId: user.userId,
        movieId,
        content: newReview,
      });
      setNewReview('');
      fetchReviews();
    } catch (err) {
      // handle error
    }
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await axios.delete(`/api/ReviewAPI/${reviewId}`);
      fetchReviews();
    } catch (err) {
      // handle error
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 text-gradient">Reviews</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {reviews.length === 0 && <div className="text-gray-400">No reviews yet.</div>}
          {reviews.map((review) => (
            <div key={review.reviewId} className="bg-black/40 rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-blue-300">{review.user?.userName || 'User'}</div>
                <div className="text-gray-200">{review.content}</div>
                <div className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleString()}</div>
              </div>
              {(user && (user.userId === review.userId || isAdmin)) && (
                <button
                  onClick={() => handleDelete(review.reviewId)}
                  className="text-red-400 hover:text-red-600 font-bold ml-4"
                  title="Delete Review"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isAuthenticated && user && (
        <form onSubmit={handleAddReview} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="flex-1 rounded-lg p-2 bg-black/60 text-white border border-gray-700 focus:outline-none"
            placeholder="Add a review..."
            maxLength={300}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
