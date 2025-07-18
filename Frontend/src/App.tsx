import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { HomePage } from './components/Home/HomePage';
import { MovieGrid } from './components/Movies/MovieGrid';
import { MovieModal } from './components/Movies/MovieModal';
import { AddEditMovieModal } from './components/Movies/AddEditMovieModal';
import { AuthModal } from './components/Auth/AuthModal';
import { ProfileModal } from './components/Profile/ProfileModal';
import UserDetailsPage from './components/User/UserDetailsPage';
import { AuthProvider } from './contexts/AuthContext';
import { useMovies } from './hooks/useMovies';
import { useUserLists } from './hooks/useUserLists';
import { Movie, RecommendedMovie } from './types/movie';
import { apiService } from './services/api';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1); // Default to 1 for demo purposes

  const { 
    movies, 
    recommendedMovies, 
    isLoading, 
    searchMovies, 
    createMovie, 
    updateMovie, 
    deleteMovie,
    refetch 
  } = useMovies();
  
  // Debug log for recommended movies
  console.log('AppContent: recommendedMovies', recommendedMovies);
  
  const {
    watchlist,
    favorites,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    isInWatchlist,
    isInFavorites,
  } = useUserLists();

  // Remove the fetchTotalUsers function and useEffect since there's no backend
  // In a real application, this would fetch from your backend API

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setShowAddMovieModal(true);
  };

  const handleSaveMovie = async (movieData: Omit<Movie, 'movieId'>) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.movieId, { ...movieData, movieId: editingMovie.movieId });
      } else {
        await createMovie(movieData);
      }
      setEditingMovie(null);
      setShowAddMovieModal(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteMovie = async (movieId: number) => {
    try {
      await deleteMovie(movieId);
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const getRecommendedMoviesData = (): Movie[] => {
    return recommendedMovies
      .map((rec: any) => {
        const src = rec.movie ?? rec.Movie;
        if (!src) return undefined;
        return {
          movieId: src.movieId ?? src.MovieId,
          movieTitle: src.movieTitle ?? src.MovieTitle ?? '',
          movieGenre: src.movieGenre ?? src.MovieGenre ?? '',
          releaseYear: src.releaseYear ?? src.ReleaseYear ?? 0,
          imgUrl: src.imgUrl ?? src.ImgUrl ?? '',
          rating: src.rating ?? src.Rating ?? 0,
          description: src.description ?? src.Description ?? '',
          duration: src.duration ?? src.Duration ?? 0,
        } as Movie;
      })
      .filter(Boolean) as Movie[];
  };

  const getFavoriteMovies = (): Movie[] => {
    // Combine main movies and recommended movies for lookup
    const allMovies = [
      ...movies,
      ...getRecommendedMoviesData().filter(
        recMovie => !movies.some(m => m.movieId === recMovie.movieId)
      ),
    ];
    return favorites
      .map(item => allMovies.find(movie => movie.movieId === item.movieId))
      .filter((movie): movie is Movie => movie !== undefined);
  };

  const getWatchlistMovies = (): Movie[] => {
    return watchlist
      .map(item => movies.find(movie => movie.movieId === item.movieId))
      .filter((movie): movie is Movie => movie !== undefined);
  };

  const getWatchlistMovieIds = (): number[] => {
    return watchlist.map(item => item.movieId);
  };

  const getFavoriteMovieIds = (): number[] => {
    return favorites.map(item => item.movieId);
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'home': return 'Home';
      case 'recommended': return 'Recommended Movies';
      case 'favorites': return 'My Favorites';
      case 'watchlist': return 'My Watchlist';
      case 'user': return 'User Details';
      default: return 'MovieNest';
    }
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <MovieGrid
          movies={searchResults}
          title={`Search Results (${searchResults.length})`}
          onAddToWatchlist={addToWatchlist}
          onAddToFavorites={addToFavorites}
          onRemoveFromWatchlist={removeFromWatchlist}
          onRemoveFromFavorites={removeFromFavorites}
          watchlistMovieIds={getWatchlistMovieIds()}
          favoriteMovieIds={getFavoriteMovieIds()}
          onMovieClick={handleMovieClick}
          onEditMovie={handleEditMovie}
          onDeleteMovie={handleDeleteMovie}
        />
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <HomePage
            favoriteCount={favorites.length}
            watchlistCount={watchlist.length}
            totalMovies={movies.length}
            totalUsers={totalUsers}
          />
        );
      case 'recommended':
        return (
          <MovieGrid
            movies={getRecommendedMoviesData()}
            title="Recommended Movies"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleDeleteMovie}
            isLoading={isLoading}
          />
        );
      case 'favorites':
        return (
          <MovieGrid
            movies={getFavoriteMovies()}
            title="My Favorites"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        );
      case 'watchlist':
        return (
          <MovieGrid
            movies={getWatchlistMovies()}
            title="My Watchlist"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        );
      case 'user':
        return <UserDetailsPage />; // Update renderContent for user
      default:
        return (
          <MovieGrid
            movies={movies}
            title="All Movies"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleDeleteMovie}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onShowAuth={() => setShowAuthModal(true)}
        onShowProfile={() => setShowProfileModal(true)}
        favoriteCount={favorites.length}
        watchlistCount={watchlist.length}
      />

      <div className="flex-1 flex flex-col">
        <Header
          title={getPageTitle()}
          onSearch={handleSearch}
          onShowAuth={() => setShowAuthModal(true)}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <AddEditMovieModal
        isOpen={showAddMovieModal}
        onClose={() => {
          setShowAddMovieModal(false);
          setEditingMovie(null);
        }}
        onSave={handleSaveMovie}
        movie={editingMovie}
      />

      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onAddToWatchlist={addToWatchlist}
        onAddToFavorites={addToFavorites}
        onRemoveFromWatchlist={removeFromWatchlist}
        onRemoveFromFavorites={removeFromFavorites}
        isInWatchlist={selectedMovie ? isInWatchlist(selectedMovie.movieId) : false}
        isInFavorites={selectedMovie ? isInFavorites(selectedMovie.movieId) : false}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;