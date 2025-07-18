// API Configuration
// Use HTTPS explicitly to match backend
const API_BASE_URL = `https://localhost:7159/api`;

const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Something went wrong');
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

export const apiService = {
    // User
    login: (credentials: any) => request('UserAPI/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    register: (userData: any) => request('UserAPI/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    updateUser: (id: number, userData: any) => request(`UserAPI/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    }),

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