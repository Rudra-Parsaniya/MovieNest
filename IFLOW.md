# MovieNest Project Overview

## Project Description
MovieNest is a full-stack movie management and recommendation application that allows users to browse, search, and manage movies. The application features user authentication, movie recommendations, watchlists, favorites, and admin functionality for managing movies and users.

## Technology Stack
- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: ASP.NET Core Web API with C#
- **Database**: Microsoft SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Entity Framework Core

## Project Structure
```
MovieNest/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components organized by feature
│   │   ├── contexts/         # React context providers (AuthContext)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service layer
│   │   └── types/            # TypeScript type definitions
│   └── package.json          # Frontend dependencies and scripts
└── MovieProject/             # .NET backend solution
    └── MovieProject/         # Main ASP.NET Core project
        ├── Controllers/      # API controllers
        ├── Models/           # Entity models and DbContext
        ├── Middlewares/      # Custom middleware
        ├── Migrations/       # Database migrations
        ├── Validators/       # FluentValidation validators
        └── Program.cs        # Application entry point
```

## Frontend Structure
The frontend is organized into feature-based components:
- **Auth**: Authentication modal components
- **Explore**: Movie exploration features
- **Home**: Dashboard/home page components
- **Layout**: Header and sidebar components
- **Movies**: Movie grid, cards, modals, and carousels
- **Profile**: User profile components
- **User**: User details and buddies components
- **Admin**: Admin-specific movie and user management

### Key Frontend Features
- User authentication (login/register)
- Movie browsing with pagination
- Search functionality (basic and advanced)
- Movie recommendations
- Watchlist and favorites management
- User profile management
- Admin panel for movie/user management

## Backend Structure
The backend follows a standard ASP.NET Core MVC pattern with API controllers:

### Controllers
- `MovieAPIController`: Core movie operations (CRUD, search)
- `UserAPIController`: User management and authentication
- `FavouriteAPIController`: Favorite movies management
- `WatchListAPIController`: Watchlist management
- `RecMovieAPIController`: Recommended movies
- `ReviewAPIController`: Movie reviews
- `TrendingMoviesAPIController`: Trending movies
- `UpcomingMoviesAPIController`: Upcoming movies

### Models
- `Movie`: Core movie entity
- `User`: User entity with authentication
- `Favorite`: User favorite movies
- `WatchList`: User watchlist items
- `RecMovie`: Recommended movies
- `Review`: Movie reviews
- `TrendingMovie`: Trending movies
- `UpcomingMovie`: Upcoming movies
- `BuddyRequest`: User buddy requests

### Key Backend Features
- JWT-based authentication
- Entity Framework Core for data access
- FluentValidation for request validation
- CORS configuration for frontend communication
- Swagger/OpenAPI documentation
- Custom exception middleware

## Database Schema
The application uses SQL Server with the following key tables:
- `Movies`: Core movie information
- `Users`: User accounts and authentication
- `Favorites`: User favorite movies (many-to-many)
- `WatchList`: User watchlist items (many-to-many)
- `RecMovies`: Recommended movies
- `Reviews`: Movie reviews
- `TrendingMovies`: Trending movies with scores
- `UpcomingMovies`: Upcoming movie releases
- `BuddyRequests`: User connection requests

## Building and Running

### Prerequisites
- Node.js (v18 or later)
- .NET 8 SDK
- SQL Server (Express or full version)
- npm or yarn

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev      # Development server
npm run build    # Production build
```

### Backend Setup
```bash
cd MovieProject/MovieProject
dotnet restore
dotnet build
dotnet run
```

### Environment Configuration
1. Update the connection string in `appsettings.json` to match your SQL Server instance
2. Ensure SQL Server is running and accessible
3. The application will create the database schema on first run

### Development Commands
- **Frontend**:
  - `npm run dev`: Start development server
  - `npm run build`: Create production build
  - `npm run lint`: Run ESLint

- **Backend**:
  - `dotnet run`: Start development server
  - `dotnet build`: Build the project
  - `dotnet watch run`: Start development server with hot reload

## API Documentation
The backend provides Swagger documentation at `/swagger` when running in development mode. This includes:
- Interactive API testing interface
- Detailed endpoint documentation
- JWT authentication support

## Development Conventions

### Frontend
- TypeScript with strict typing
- React functional components with hooks
- Tailwind CSS for styling
- Component organization by feature
- Context API for state management
- Axios for HTTP requests

### Backend
- C# with nullable reference types
- Entity Framework Core for data access
- FluentValidation for input validation
- Repository pattern (implicit through DbContext)
- RESTful API design
- JWT-based authentication

## Authentication Flow
1. User registers or logs in via `/api/UserAPI/login` or `/api/UserAPI/register`
2. Server returns JWT token on successful authentication
3. Client stores token and includes in Authorization header for subsequent requests
4. Server validates JWT on protected endpoints

## Deployment Considerations
- Update connection strings for production database
- Configure proper JWT secrets (don't use default values)
- Set appropriate logging levels
- Consider HTTPS in production
- Optimize database indexes for performance