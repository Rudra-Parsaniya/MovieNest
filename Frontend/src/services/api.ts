// API Configuration
// Use proxy for development to avoid CORS issues
const API_BASE_URL = `/api`;

import { UpdateUserRequest, AdminMovieData, AdminUserData } from '../types/movie';

const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            let errorMessage = 'Something went wrong';
            try {
                const errorText = await response.text();
                if (errorText) {
                    errorMessage = errorText;
                }
            } catch (e) {
                console.error('Could not read error response:', e);
            }
            
            console.error('API error response:', errorMessage, 'for endpoint:', endpoint);
            console.error('Full error details:', {
                status: response.status,
                statusText: response.statusText,
                url: url,
                body: options.body
            });
            throw new Error(errorMessage);
        }

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Request failed for endpoint:', endpoint, 'Error:', error);
        
        // Check for specific error types
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Network error - possible causes:');
            console.error('1. Backend server not running');
            console.error('2. CORS issues');
            console.error('3. SSL certificate problems');
            console.error('4. Wrong API URL');
            throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.');
        }
        
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error('Connection failed: Please check your internet connection and ensure the backend server is running.');
        }
        
        throw error;
    }
};

export const apiService = {
    
    // User
    login: (credentials: any) => request('UserAPI/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    register: (userData: any) => {
        return request('UserAPI/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
    updateUser: (id: number, userData: UpdateUserRequest) => {
        return request(`UserAPI/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        }).catch(error => {
            throw error;
        });
    },

    // Movies
    getMovies: (searchTerm?: string) => {
        const endpoint = searchTerm ? `MovieAPI/search?title=${searchTerm}` : 'MovieAPI';
        return request(endpoint);
    },
    getMovieById: (id: number) => request(`MovieAPI/${id}`),

    // Movie CRUD + Search (needed by hooks)
    searchMovies: (title?: string, genre?: string | string[], year?: number) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) {
            const genreParam = Array.isArray(genre) ? genre.join(',') : genre;
            params.append('genre', genreParam);
        }
        if (year !== undefined) params.append('year', year.toString());
        const query = params.toString();
        const endpoint = query ? `MovieAPI/search?${query}` : 'MovieAPI';
        return request(endpoint);
    },
    createMovie: (movieData: any) => {
        // Transform camelCase to PascalCase for backend
        const transformedData = {
            MovieTitle: movieData.movieTitle,
            MovieGenre: movieData.movieGenre,
            ReleaseYear: movieData.releaseYear,
            ImgUrl: movieData.imgUrl,
            Rating: movieData.rating,
            Description: movieData.description,
            Duration: movieData.duration,
        };
        return request('MovieAPI', {
            method: 'POST',
            body: JSON.stringify(transformedData),
        });
    },
    updateMovie: (id: number, movieData: any) => {
        // Transform camelCase to PascalCase for backend
        const transformedData = {
            MovieId: id,
            MovieTitle: movieData.movieTitle,
            MovieGenre: movieData.movieGenre,
            ReleaseYear: movieData.releaseYear,
            ImgUrl: movieData.imgUrl,
            Rating: movieData.rating,
            Description: movieData.description,
            Duration: movieData.duration,
        };
        return request(`MovieAPI/${id}`, {
            method: 'PUT',
            body: JSON.stringify(transformedData),
        });
    },
    deleteMovie: (id: number) => request(`MovieAPI/${id}`, {
        method: 'DELETE',
    }),

    // Favorites
    getUserFavorites: (userId: number) => request(`FavouriteAPI/search?userId=${userId}`),
    addToFavorites: (userId: number, movieId: number) => request('FavouriteAPI', {
        method: 'POST',
        body: JSON.stringify({ userId, movieId }),
    }),
    removeFromFavorites: (id: number) => request(`FavouriteAPI/${id}`, {
        method: 'DELETE',
    }),

    // Watchlist
    getUserWatchlist: (userId: number) => request(`WatchListAPI/search?userId=${userId}`),
    addToWatchlist: (userId: number, movieId: number) => request('WatchListAPI', {
        method: 'POST',
        body: JSON.stringify({ userId, movieId }),
    }),
    removeFromWatchlist: (id: number) => request(`WatchListAPI/${id}`, {
        method: 'DELETE',
    }),

    // Recommendations
    getRecommendedMovies: () => request(`RecMovieAPI`),
    deleteRecommendedMovie: (recId: number) => request(`RecMovieAPI/${recId}`, {
      method: 'DELETE',
    }),
    addRecommendedMovie: (movieId: number) => request('RecMovieAPI', {
      method: 'POST',
      body: JSON.stringify({ movieId }),
    }),

    // Upcoming Movies
    getUpcomingMovies: () => request('UpcomingMoviesAPI'),
    getUpcomingMoviesByDate: () => request('UpcomingMoviesAPI/upcoming'),
    getUpcomingMovieById: (id: number) => request(`UpcomingMoviesAPI/${id}`),
    searchUpcomingMovies: (title?: string, genre?: string, year?: number) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) params.append('genre', genre);
        if (year !== undefined) params.append('year', year.toString());
        const query = params.toString();
        const endpoint = query ? `UpcomingMoviesAPI/search?${query}` : 'UpcomingMoviesAPI';
        return request(endpoint);
    },

    // Admin-specific endpoints
    getAllUsers: () => request('UserAPI'),
    deleteUser: (id: number) => request(`UserAPI/${id}`, {
        method: 'DELETE',
    }),
    updateUserRole: (id: number, role: 'user' | 'admin') => request(`UserAPI/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
    }),
};