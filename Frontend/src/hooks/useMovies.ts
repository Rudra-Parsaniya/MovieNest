import { useState, useEffect } from 'react';
import { Movie, RecommendedMovie } from '../types/movie';
import { apiService } from '../services/api';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const moviesData = await apiService.getMovies();
      setMovies(moviesData);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendedMovies = async () => {
    try {
      const recommendedData = await apiService.getRecommendedMovies();
      console.log('Raw recommended response:', recommendedData);
      setRecommendedMovies(recommendedData);
    } catch (err) {
      console.error('Error fetching recommended movies:', err);
    }
  };

  const searchMovies = async (title?: string, genre?: string, year?: number): Promise<Movie[]> => {
    try {
      return await apiService.searchMovies(title, genre, year);
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  const createMovie = async (movieData: Omit<Movie, 'movieId'>) => {
    try {
      const newMovie = await apiService.createMovie(movieData);
      setMovies(prev => [...prev, newMovie]);
      return newMovie;
    } catch (error) {
      console.error('Create movie failed:', error);
      throw error;
    }
  };

  const updateMovie = async (id: number, movieData: Movie) => {
    try {
      const updatedMovie = await apiService.updateMovie(id, movieData);
      setMovies(prev => prev.map(movie => 
        movie.movieId === id ? updatedMovie : movie
      ));
      return updatedMovie;
    } catch (error) {
      console.error('Update movie failed:', error);
      throw error;
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      await apiService.deleteMovie(id);
      setMovies(prev => prev.filter(movie => movie.movieId !== id));
    } catch (error) {
      console.error('Delete movie failed:', error);
      throw error;
    }
  };

  const getGenres = (): string[] => {
    const genres = [...new Set(movies.map(movie => movie.movieGenre))];
    return genres.sort();
  };

  return {
    movies,
    recommendedMovies,
    isLoading,
    error,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getGenres,
    refetch: fetchMovies,
  };
};