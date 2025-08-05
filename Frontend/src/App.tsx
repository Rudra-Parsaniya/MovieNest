import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { HomePage } from './components/Home/HomePage';
import { ExplorePage } from './components/Explore/ExplorePage';
import { MovieGrid } from './components/Movies/MovieGrid';
import { MovieModal } from './components/Movies/MovieModal';
import { AddEditMovieModal } from './components/Movies/AddEditMovieModal';
import { AuthModal } from './components/Auth/AuthModal';
import { ProfileModal } from './components/Profile/ProfileModal';
import UserDetailsPage from './components/User/UserDetailsPage';
import { AdminMovies } from './components/Admin/AdminMovies';
import { AdminUsers } from './components/Admin/AdminUsers';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useMovies } from './hooks/useMovies';
import { useUserLists } from './hooks/useUserLists';
import { Movie, RecommendedMovie } from './types/movie';
import { apiService } from './services/api';

function AppContent() {
  const { user } = useAuth();
  
  // On load, get last view from localStorage
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('currentView') || 'home');

  // Whenever currentView changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdminsCount, setTotalAdminsCount] = useState(0);



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

  // Fetch total users and admins count
  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const users = await apiService.getAllUsers();
        setTotalUsers(users.length);
        const adminCount = users.filter((user: any) => user.role === 'admin' || user.Role === 'admin').length;
        setTotalAdminsCount(adminCount);
      } catch (error) {
        console.error('Failed to fetch user counts:', error);
        setTotalUsers(0);
        setTotalAdminsCount(0);
      }
    };

    fetchUserCounts();
  }, []);

  // User counts are now fetched from the backend API

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

  const handleAdvancedSearch = async (title?: string, genre?: string | string[], year?: number) => {
    if (!title && !genre && year === undefined) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMovies(title, genre, year);
      setSearchResults(results);
    } catch (error) {
      console.error('Advanced search failed:', error);
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

  // Place these handlers above renderContent so they are in scope
  const handleRemoveFromFavorites = async (movieId: number) => {
    await removeFromFavorites(movieId);
    // No need to refetch here as removeFromFavorites already updates the state
  };
  const handleRemoveFromWatchlist = async (movieId: number) => {
    await removeFromWatchlist(movieId);
    // No need to refetch here as removeFromWatchlist already updates the state
  };

  // Handler to delete a recommended movie (admin only)
  const handleDeleteRecommendedMovie = async (movieId: number) => {
    const recMovie = recommendedMovies.find((rec: RecommendedMovie) => rec.movie?.movieId === movieId);
    if (!recMovie) return;
    await apiService.deleteRecommendedMovie(recMovie.recId);
    refetch();
  };

  // Handler to add a movie to recommended (admin only)
  const handleAddRecommendedMovie = async (movieId: number) => {
    await apiService.addRecommendedMovie(movieId);
    refetch();
  };
  // Get recommended movie IDs
  const recommendedMovieIds = recommendedMovies.map((rec: RecommendedMovie) => rec.movie?.movieId).filter(Boolean);

  const getRecommendedMoviesData = (): Movie[] => {
    return recommendedMovies
      .map((rec: RecommendedMovie) => {
        const src = rec.movie;
        if (!src) return undefined;
        return {
          movieId: src.movieId,
          movieTitle: src.movieTitle,
          movieGenre: src.movieGenre,
          releaseYear: src.releaseYear,
          imgUrl: src.imgUrl,
          rating: src.rating,
          description: src.description,
          duration: src.duration,
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
      case 'movies': return 'Movie Management';
      case 'users': return 'User Management';
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
            recommendedMoviesCount={recommendedMovies.length}
            totalAdminsCount={totalAdminsCount}
          />
        );
      case 'explore':
        return (
          <ExplorePage
            favoriteCount={favorites.length}
            watchlistCount={watchlist.length}
            totalMovies={movies.length}
          />
        );
      case 'recommended':
        return (
          <MovieGrid
            movies={getRecommendedMoviesData()}
            // title="Recommended Movies"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            isLoading={isLoading}
            showActions={user?.role !== 'admin'}
            onDeleteMovie={user?.role === 'admin' ? handleDeleteRecommendedMovie : undefined}
          />
        );
      case 'favorites':
        return (
          <MovieGrid
            movies={getFavoriteMovies()}
            // title="My Favorites"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleRemoveFromFavorites}
            showActions={false}
          />
        );
      case 'watchlist':
        return (
          <MovieGrid
            movies={getWatchlistMovies()}
            // title="My Watchlist"
            onAddToWatchlist={addToWatchlist}
            onAddToFavorites={addToFavorites}
            onRemoveFromWatchlist={removeFromWatchlist}
            onRemoveFromFavorites={removeFromFavorites}
            watchlistMovieIds={getWatchlistMovieIds()}
            favoriteMovieIds={getFavoriteMovieIds()}
            onMovieClick={handleMovieClick}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleRemoveFromWatchlist}
            showActions={false}
          />
        );
      case 'user':
        return <UserDetailsPage />; // Update renderContent for user
      case 'movies':
        return user?.role === 'admin' ? <AdminMovies /> : <div>Access Denied</div>;
      case 'users':
        return user?.role === 'admin' ? <AdminUsers /> : <div>Access Denied</div>;
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
            onAddRecommended={user?.role === 'admin' ? handleAddRecommendedMovie : undefined}
            recommendedMovieIds={recommendedMovieIds}
          />
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex container-dark text-slate-100"
    >
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
          onAdvancedSearch={handleAdvancedSearch}
          onShowAuth={() => setShowAuthModal(true)}
        />

        <main className="flex-1 overflow-y-auto section-padding">
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