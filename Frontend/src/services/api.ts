// API Configuration
// Use HTTPS explicitly to match backend
const API_BASE_URL = `https://localhost:7159/api`;

import { UpdateUserRequest } from '../types/movie';

const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log('Making API request to:', url, 'with options:', options);
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        console.log('API response status:', response.status, 'for endpoint:', endpoint);

        if (!response.ok) {
            const error = await response.text();
            console.error('API error response:', error, 'for endpoint:', endpoint);
            console.error('Full error details:', {
                status: response.status,
                statusText: response.statusText,
                url: url,
                body: options.body
            });
            throw new Error(error || 'Something went wrong');
        }

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        console.log('API response data for endpoint:', endpoint, ':', data);
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
    // Test connectivity
    testConnectivity: async () => {
        try {
            console.log('Testing API connectivity...');
            const response = await fetch(`${API_BASE_URL}/UserAPI`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ API connectivity test successful:', data.length, 'users found');
                return true;
            } else {
                console.error('❌ API connectivity test failed:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('❌ API connectivity test error:', error);
            return false;
        }
    },
    
    // User
    login: (credentials: any) => request('UserAPI/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    register: (userData: any) => request('UserAPI/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    updateUser: (id: number, userData: UpdateUserRequest) => {
        console.log('Updating user with ID:', id, 'Data:', userData);
        return request(`UserAPI/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        }).catch(error => {
            console.error('Update user API error:', error);
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
    searchMovies: (title?: string, genre?: string, year?: number) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) params.append('genre', genre);
        if (year !== undefined) params.append('year', year.toString());
        const query = params.toString();
        const endpoint = query ? `MovieAPI/search?${query}` : 'MovieAPI';
        return request(endpoint);
    },
    createMovie: (movieData: any) => request('MovieAPI', {
        method: 'POST',
        body: JSON.stringify(movieData),
    }),
    updateMovie: (id: number, movieData: any) => request(`MovieAPI/${id}`, {
        method: 'PUT',
        body: JSON.stringify(movieData),
    }),
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
};