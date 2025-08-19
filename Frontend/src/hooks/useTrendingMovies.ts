import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export interface TrendingMovie {
  trendingId: number;
  movieId?: number;
  trendingScore?: number;
  movie?: {
    movieId: number;
    movieTitle: string;
    movieGenre?: string;
    releaseYear?: number;
    imgUrl?: string;
    rating?: number;
    description?: string;
    duration?: number;
  };
}

export const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getTrendingMovies();
      setTrendingMovies(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch trending movies');
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return {
    trendingMovies,
    loading,
    error,
    refetch: fetchTrendingMovies,
  };
}; 