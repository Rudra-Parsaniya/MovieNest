import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export interface UpcomingMovie {
  upcomingId: number;
  movieTitle: string;
  movieGenre?: string;
  releaseYear?: number;
  imgUrl?: string;
  description?: string;
  duration?: number;
  releaseDate: string;
  trailerUrl?: string;
}

export const useUpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUpcomingMoviesByDate();
      setUpcomingMovies(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch upcoming movies');
      console.error('Error fetching upcoming movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return {
    upcomingMovies,
    loading,
    error,
    refetch: fetchUpcomingMovies,
  };
}; 