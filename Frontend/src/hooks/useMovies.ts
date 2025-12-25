import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Movie, RecommendedMovie } from '../types/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMovies = async (pageOverride?: number, pageSizeOverride?: number) => {
    try {
      const data = await apiService.getMovies(pageOverride ?? page, pageSizeOverride ?? pageSize);
      setMovies(data.movies);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please check if the backend server is running.');
      // Set empty array to prevent further errors
      setMovies([]);
      setTotalCount(0);
    }
  };

  const fetchRecommendedMovies = async () => {
    try {
      const data = await apiService.getRecommendedMovies();
      setRecommendedMovies(data);
    } catch (err: any) {
      console.error('Error fetching recommended movies:', err);
      // Don't set error here as it's not critical
      setRecommendedMovies([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        await Promise.all([fetchMovies(), fetchRecommendedMovies()]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, pageSize]);

  const searchMovies = async (title?: string, genre?: string | string[], year?: number) => {
    try {
      const data = await apiService.searchMovies(title, genre, year);
      return data;
    } catch (err: any) {
      console.error('Error searching movies:', err);
      throw err;
    }
  };

  const createMovie = async (movieData: Omit<Movie, 'movieId'>) => {
    try {
      const data = await apiService.createMovie(movieData);
      await fetchMovies(); // Refresh the movies list
      return data;
    } catch (err: any) {
      console.error('Error creating movie:', err);
      throw err;
    }
  };

  const updateMovie = async (id: number, movieData: Partial<Movie>) => {
    try {
      const data = await apiService.updateMovie(id, movieData);
      await fetchMovies(); // Refresh the movies list
      return data;
    } catch (err: any) {
      console.error('Error updating movie:', err);
      throw err;
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      await apiService.deleteMovie(id);
      await fetchMovies(); // Refresh the movies list
    } catch (err: any) {
      console.error('Error deleting movie:', err);
      throw err;
    }
  };

  const refetch = async () => {
    await Promise.all([fetchMovies(), fetchRecommendedMovies()]);
  };

  return {
    movies,
    recommendedMovies,
    isLoading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    refetch,
  };
};