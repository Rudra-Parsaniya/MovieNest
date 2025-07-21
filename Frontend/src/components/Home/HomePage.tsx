// import React from 'react';
// import { Film, Star, Bookmark, TrendingUp, Users } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// interface HomePageProps {
//   favoriteCount: number;
//   watchlistCount: number;
//   totalMovies: number;
//   totalUsers: number;
// }

// export const HomePage: React.FC<HomePageProps> = ({
//   favoriteCount,
//   watchlistCount,
//   totalMovies,
//   totalUsers,
// }) => {
//   const { user, isAuthenticated } = useAuth();

//   const stats = [
//     {
//       title: 'Total Movies',
//       value: totalMovies,
//       icon: Film,
//       color: 'bg-blue-600',
//     },
//     {
//       title: 'My Favorites',
//       value: favoriteCount,
//       icon: Star,
//       color: 'bg-yellow-600',
//     },
//     {
//       title: 'My Watchlist',
//       value: watchlistCount,
//       icon: Bookmark,
//       color: 'bg-green-600',
//     },
//     {
//       title: 'Total Users',
//       value: totalUsers,
//       icon: Users,
//       color: 'bg-purple-600',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-2 md:px-8 lg:px-16 flex flex-col gap-12 relative overflow-hidden">
//       {/* Decorative Accent - Watermark Icon */}
//       <Film className="absolute -top-10 -right-10 w-96 h-96 text-red-900 opacity-10 pointer-events-none select-none z-0" />
//       {/* Welcome Section */}
//       <section className="w-full max-w-5xl mx-auto relative z-10 bg-gray-900/80 border border-red-700/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-2xl before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-red-900/30 before:to-blue-900/10 before:z-[-1] transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_12px_48px_0_rgba(255,0,80,0.15)]">
//         {/* Decorative colored bar */}
//         <div className="absolute left-0 top-0 h-2 w-32 bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 rounded-tl-3xl rounded-br-2xl z-20" />
//         <div className="flex-1 space-y-4">
//           <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-lg">
//             Welcome to <span className="text-red-600">MovieNest</span>
//           </h1>
//           {isAuthenticated && user && (
//             <span className="block text-2xl font-normal text-gray-300 mb-2">
//               Hello, <span className="text-red-400 font-semibold">{user.fullName}</span>!
//             </span>
//           )}
//           <p className="text-lg text-gray-300 mb-4">
//             Discover and organize your favorite movies. Build your personal collection with our comprehensive movie database featuring thousands of titles across all genres.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-lg shadow-md">
//               <TrendingUp className="w-5 h-5 text-blue-400" />
//               <span className="text-gray-200">Personalized Recommendations</span>
//             </div>
//             <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-lg shadow-md">
//               <Star className="w-5 h-5 text-yellow-400" />
//               <span className="text-gray-200">Curated Collections</span>
//             </div>
//           </div>
//         </div>
//         <div className="hidden md:block flex-shrink-0">
//           <Film className="w-40 h-40 text-red-600 opacity-80 drop-shadow-2xl" />
//         </div>
//       </section>

//       {/* Statistics Grid */}
//       <section className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-6 flex items-center gap-4 transition-transform duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]"
//           >
//             <div className={`${stat.color} p-4 rounded-xl flex items-center justify-center`}>
//               <stat.icon className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
//               <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Features Section */}
//       <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(255,0,80,0.10)] hover:bg-gray-900/90">
//           <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//             <Film className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">Vast Movie Library</h3>
//           <p className="text-gray-300">
//             Explore thousands of movies across all genres, from classic films to the latest releases.
//           </p>
//         </div>
//         <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(255,0,80,0.10)] hover:bg-gray-900/90">
//           <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//             <Star className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">Personal Favorites</h3>
//           <p className="text-gray-300">
//             Mark your favorite movies and build a personalized collection that reflects your taste.
//           </p>
//         </div>
//         <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(255,0,80,0.10)] hover:bg-gray-900/90">
//           <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//             <Bookmark className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">Watch Later</h3>
//           <p className="text-gray-300">
//             Save movies to your watchlist and never forget about films you want to see.
//           </p>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="w-full max-w-5xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-2xl p-8 transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_12px_48px_0_rgba(255,0,80,0.10)]">
//         <h2 className="text-2xl font-bold text-white mb-6">About MovieNest</h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div>
//             <p className="text-gray-300 mb-4">
//               MovieNest is your ultimate destination for discovering and organizing movies. 
//               Our platform offers a comprehensive database of films with detailed information, 
//               ratings, and user reviews.
//             </p>
//             <p className="text-gray-300">
//               Whether you're a casual movie watcher or a dedicated cinephile, MovieNest 
//               provides the tools you need to track your viewing history, discover new 
//               favorites, and connect with other movie enthusiasts.
//             </p>
//           </div>
//           <div className="space-y-6">
//             <div className="flex items-start gap-4">
//               <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
//               <div>
//                 <h4 className="text-white font-medium">Comprehensive Database</h4>
//                 <p className="text-gray-400 text-sm">Access detailed information about thousands of movies</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
//               <div>
//                 <h4 className="text-white font-medium">Personal Collections</h4>
//                 <p className="text-gray-400 text-sm">Create and manage your own movie lists</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
//               <div>
//                 <h4 className="text-white font-medium">Smart Recommendations</h4>
//                 <p className="text-gray-400 text-sm">Discover new movies based on your preferences</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

"use client"

import type React from "react"
import { Film, Star, Bookmark, Users, Play, ArrowRight, Sparkles, Heart, Eye } from "lucide-react"

interface HomePageProps {
  favoriteCount: number
  watchlistCount: number
  totalMovies: number
  totalUsers: number
}

// Mock auth context for demo
const useAuth = () => ({
  user: { fullName: "Alex Johnson" },
  isAuthenticated: true,
})

export const HomePage: React.FC<HomePageProps> = ({
  favoriteCount = 127,
  watchlistCount = 43,
  totalMovies = 15420,
  totalUsers = 8934,
}) => {
  const { user, isAuthenticated } = useAuth()

  const stats = [
    {
      title: "Total Movies",
      value: totalMovies.toLocaleString(),
      icon: Film,
      gradient: "from-blue-500 to-cyan-400",
      bgGradient: "from-blue-500/10 to-cyan-400/10",
    },
    {
      title: "My Favorites",
      value: favoriteCount,
      icon: Heart,
      gradient: "from-pink-500 to-rose-400",
      bgGradient: "from-pink-500/10 to-rose-400/10",
    },
    {
      title: "My Watchlist",
      value: watchlistCount,
      icon: Bookmark,
      gradient: "from-emerald-500 to-teal-400",
      bgGradient: "from-emerald-500/10 to-teal-400/10",
    },
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      gradient: "from-purple-500 to-indigo-400",
      bgGradient: "from-purple-500/10 to-indigo-400/10",
    },
  ]

  const features = [
    {
      icon: Film,
      title: "Cinematic Experience",
      description: "Immerse yourself in a vast collection of movies with stunning visuals and detailed information.",
      gradient: "from-red-500 to-orange-400",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Discover your next favorite movie with our intelligent recommendation system.",
      gradient: "from-yellow-500 to-amber-400",
    },
    {
      icon: Eye,
      title: "Track Everything",
      description: "Keep track of what you've watched, loved, and want to see next.",
      gradient: "from-green-500 to-emerald-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Film Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Film className="absolute top-20 left-10 w-6 h-6 text-white/10 animate-bounce delay-300" />
        <Star className="absolute top-40 right-20 w-4 h-4 text-yellow-400/20 animate-bounce delay-700" />
        <Play className="absolute bottom-40 left-20 w-5 h-5 text-red-400/20 animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">Welcome to the Future of Movie Discovery</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-400 to-pink-400 mb-6 tracking-tight leading-tight">
              Movie<span className="text-red-500">Nest</span>
            </h1>

            {isAuthenticated && user && (
              <div className="mb-8">
                <p className="text-2xl text-slate-300 mb-2">
                  Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 font-semibold">
                    {user.fullName}
                  </span>
                  !
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Ready to discover your next favorite movie?</span>
                </div>
              </div>
            )}

            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Dive into a world of cinematic excellence. Discover, organize, and fall in love with movies like never
              before.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl font-semibold text-white shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Exploring
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="px-8 py-4 border border-slate-600 rounded-2xl font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 hover:border-slate-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-6 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">{stat.title}</p>
                    <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                    <div className={`h-1 w-12 bg-gradient-to-r ${stat.gradient} rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">MovieNest</span>
              ?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the perfect blend of discovery, organization, and pure movie magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/30 backdrop-blur-xl border border-slate-800/30 rounded-3xl p-8 hover:border-slate-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-white mb-6">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                    MovieNest
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  More than just a movie database – we're your personal cinema companion, designed to transform how you
                  discover, organize, and experience films.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  {[
                    {
                      title: "Comprehensive Database",
                      desc: "Access detailed information about thousands of movies from every era and genre",
                    },
                    {
                      title: "Personal Collections",
                      desc: "Create and manage your own curated movie lists with intelligent organization",
                    },
                    {
                      title: "Smart Recommendations",
                      desc: "Discover new movies tailored to your unique taste with AI-powered suggestions",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50">
                    <div className="text-center">
                      <div className="inline-flex p-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-6">
                        <Film className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                      <p className="text-slate-300 mb-6">
                        Connect with fellow movie enthusiasts and share your passion for cinema.
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300">
                        Get Started Today
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
