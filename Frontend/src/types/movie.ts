export interface Movie {
  movieId: number;
  movieTitle: string;
  movieGenre: string;
  releaseYear: number;
  imgUrl: string;
  rating: number;
  description: string;
  duration: number;
}

export interface RecommendedMovie {
  recId: number;
  movieId: number;
  movie: Movie;
}

export interface User {
  userId: number;
  username: string;
  passwordHash: string;
  fullName: string;
  age: number;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  // Backend might use PascalCase versions
  UserId?: number;
  Username?: string;
  PasswordHash?: string;
  FullName?: string;
  Age?: number;
  Email?: string;
  Role?: 'user' | 'admin';
  CreatedAt?: string;
}

export interface WatchlistItem {
  watchlistId: number;
  userId: number;
  movieId: number;
  user?: User;
  movie?: Movie;
}

export interface FavoriteItem {
  favoriteId: number;
  userId: number;
  movieId: number;
  user?: User;
  movie?: Movie;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  age: number;
  email: string;
  role: 'user' | 'admin';
}

export interface UpdateUserRequest {
  UserId: number;
  Username: string;
  FullName: string;
  Email: string;
  Age: number;
  PasswordHash: string;
  Role: 'user' | 'admin';
}

// Admin-specific types
export interface AdminMovieData {
  movieTitle: string;
  movieGenre: string;
  releaseYear: number;
  imgUrl: string;
  rating: number;
  description: string;
  duration: number;
}

export interface AdminUserData {
  userId: number;
  username: string;
  fullName: string;
  age: number;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}