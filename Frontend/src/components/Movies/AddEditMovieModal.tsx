import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Movie } from '../../types/movie';

interface AddEditMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movieData: Omit<Movie, 'movieId'>) => Promise<void>;
  movie?: Movie | null;
}

export const AddEditMovieModal: React.FC<AddEditMovieModalProps> = ({
  isOpen,
  onClose,
  onSave,
  movie,
}) => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    movieGenre: '',
    releaseYear: new Date().getFullYear(),
    imgUrl: '',
    rating: 0,
    description: '',
    duration: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (movie) {
      setFormData({
        movieTitle: movie.movieTitle,
        movieGenre: movie.movieGenre,
        releaseYear: movie.releaseYear,
        imgUrl: movie.imgUrl,
        rating: movie.rating,
        description: movie.description,
        duration: movie.duration,
      });
    } else {
      setFormData({
        movieTitle: '',
        movieGenre: '',
        releaseYear: new Date().getFullYear(),
        imgUrl: '',
        rating: 0,
        description: '',
        duration: 0,
      });
    }
    setError('');
  }, [movie, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('Failed to save movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'releaseYear' || name === 'duration' || name === 'rating' 
        ? Number(value) 
        : value,
    }));
  };

  if (!isOpen) return null;

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {movie ? 'Edit Movie' : 'Add New Movie'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Movie Title *
                </label>
                <input
                  type="text"
                  name="movieTitle"
                  value={formData.movieTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Enter movie title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genre *
                </label>
                <select
                  name="movieGenre"
                  value={formData.movieGenre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="">Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Release Year *
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="600"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating (0-10) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter movie description"
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Saving...' : movie ? 'Update Movie' : 'Add Movie'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};