import { useState, useEffect } from 'react';
import { WatchlistItem, FavoriteItem } from '../types/movie';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

export const useUserLists = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserLists();
    } else {
      setWatchlist([]);
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  const fetchUserLists = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [watchlistData, favoritesData] = await Promise.all([
        apiService.getUserWatchlist(user.userId),
        apiService.getUserFavorites(user.userId),
      ]);
      
      setWatchlist(watchlistData);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching user lists:', error);
      // Set empty arrays to prevent further errors
      setWatchlist([]);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = async (movieId: number) => {
    if (!user) return;
    try {
      await apiService.addToWatchlist(user.userId, movieId);
      await fetchUserLists();
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    if (!user) return;
    try {
      const item = watchlist.find(w => w.movieId === movieId);
      if (item) {
        await apiService.removeFromWatchlist(item.watchlistId);
        await fetchUserLists();
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const addToFavorites = async (movieId: number) => {
    if (!user) return;
    try {
      await apiService.addToFavorites(user.userId, movieId);
      await fetchUserLists();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    if (!user) return;
    try {
      const item = favorites.find(f => f.movieId === movieId);
      if (item) {
        await apiService.removeFromFavorites(item.favoriteId);
        await fetchUserLists();
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const isInWatchlist = (movieId: number): boolean => {
    return watchlist.some(item => item.movieId === movieId);
  };

  const isInFavorites = (movieId: number): boolean => {
    return favorites.some(item => item.movieId === movieId);
  };

  return {
    watchlist,
    favorites,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    isInWatchlist,
    isInFavorites,
    refetch: fetchUserLists,
  };
};