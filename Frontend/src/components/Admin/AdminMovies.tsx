import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, X } from 'lucide-react';
import { Movie, AdminMovieData } from '../../types/movie';
import { apiService } from '../../services/api';
import { AddEditMovieModal } from '../Movies/AddEditMovieModal';

export const AdminMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, searchQuery, selectedGenre]);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getMovies();
      setMovies(data);
    } catch (err: any) {
      console.error('Failed to load movies:', err);
      setError(err.message || 'Failed to load movies');
      // For now, set empty array to prevent further errors
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = movies;

    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.movieGenre === selectedGenre);
    }

    setFilteredMovies(filtered);
  };

  const handleDeleteMovie = async (movieId: number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
      await apiService.deleteMovie(movieId);
      await loadMovies();
    } catch (err: any) {
      setError(err.message || 'Failed to delete movie');
    }
  };

  const handleAddMovie = async (movieData: AdminMovieData) => {
    try {
      await apiService.createMovie(movieData);
      await loadMovies();
      setShowAddModal(false);
    } catch (err: any) {
      setError(err.message || 'Failed to add movie');
    }
  };

  const handleEditMovie = async (movieData: AdminMovieData) => {
    if (!editingMovie) return;

    try {
      await apiService.updateMovie(editingMovie.movieId, movieData);
      await loadMovies();
      setEditingMovie(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update movie');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Movie Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Movie</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white pl-10 pr-8 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 appearance-none"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          {(searchQuery || selectedGenre) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('');
              }}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.movieId} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="relative">
              <img
                src={movie.imgUrl}
                alt={movie.movieTitle}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/public/MAX.webp';
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie.movieId)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2 truncate">
                {movie.movieTitle}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>{movie.movieGenre}</span>
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{movie.duration} min</span>
                <span className="flex items-center">
                  ⭐ {movie.rating}/10
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {movie.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            {searchQuery || selectedGenre ? 'No movies found matching your criteria' : 'No movies available'}
          </div>
        </div>
      )}

      {/* Add/Edit Movie Modal */}
      {(showAddModal || editingMovie) && (
        <AddEditMovieModal
          isOpen={showAddModal || !!editingMovie}
          onClose={() => {
            setShowAddModal(false);
            setEditingMovie(null);
          }}
          onSave={editingMovie ? handleEditMovie : handleAddMovie}
          movie={editingMovie}
        />
      )}
    </div>
  );
}; 