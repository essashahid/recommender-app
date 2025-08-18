import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const Analytics = () => {
  const { state } = useApp();
  const { movies, userPreferences, recommendations } = state;
  const [analytics, setAnalytics] = useState({
    totalMovies: 0,
    likedMovies: 0,
    dislikedMovies: 0,
    favoriteGenre: '',
    averageRating: 0,
    recommendationAccuracy: 0,
    genreDistribution: {},
    yearDistribution: {},
    directorFavorites: {}
  });

  useEffect(() => {
    calculateAnalytics();
  }, [movies, userPreferences, recommendations]);

  const calculateAnalytics = () => {
    const likedMovies = userPreferences.liked_movies;
    const dislikedMovies = userPreferences.disliked_movies;
    const totalRated = likedMovies.length + dislikedMovies.length;

    // Get movie objects for liked and disliked movies
    const likedMovieObjects = movies.filter(movie => likedMovies.includes(movie.id));
    const dislikedMovieObjects = movies.filter(movie => dislikedMovies.includes(movie.id));

    // Genre distribution
    const genreCount = {};
    likedMovieObjects.forEach(movie => {
      genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
    });

    // Year distribution
    const yearCount = {};
    likedMovieObjects.forEach(movie => {
      yearCount[movie.year] = (yearCount[movie.year] || 0) + 1;
    });

    // Director favorites
    const directorCount = {};
    likedMovieObjects.forEach(movie => {
      directorCount[movie.director] = (directorCount[movie.director] || 0) + 1;
    });

    // Calculate favorite genre
    const favoriteGenre = Object.keys(genreCount).reduce((a, b) => 
      genreCount[a] > genreCount[b] ? a : b, '');

    // Calculate average rating of liked movies
    const averageRating = likedMovieObjects.length > 0 
      ? likedMovieObjects.reduce((sum, movie) => sum + movie.rating, 0) / likedMovieObjects.length 
      : 0;

    setAnalytics({
      totalMovies: movies.length,
      likedMovies: likedMovies.length,
      dislikedMovies: dislikedMovies.length,
      favoriteGenre,
      averageRating: averageRating.toFixed(1),
      recommendationAccuracy: totalRated > 0 ? ((likedMovies.length / totalRated) * 100).toFixed(1) : 0,
      genreDistribution: genreCount,
      yearDistribution: yearCount,
      directorFavorites: directorCount
    });
  };

  const getTopDirectors = () => {
    return Object.entries(analytics.directorFavorites)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getTopGenres = () => {
    return Object.entries(analytics.genreDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Movie Analytics</h2>
        <p className="text-gray-600">Discover insights about your movie preferences and behavior</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🎬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Movies</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalMovies}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">👍</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Liked Movies</p>
              <p className="text-2xl font-bold text-green-900">{analytics.likedMovies}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">👎</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Disliked Movies</p>
              <p className="text-2xl font-bold text-red-900">{analytics.dislikedMovies}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.averageRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Favorite Genre */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Favorite Genre</h3>
          {analytics.favoriteGenre ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-2xl font-bold text-blue-600">{analytics.favoriteGenre}</p>
              <p className="text-gray-600 mt-2">
                You've liked {analytics.genreDistribution[analytics.favoriteGenre]} movies in this genre
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🎬</div>
              <p>Start rating movies to see your favorite genre!</p>
            </div>
          )}
        </div>

        {/* Genre Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Genre Preferences</h3>
          {getTopGenres().length > 0 ? (
            <div className="space-y-3">
              {getTopGenres().map(([genre, count]) => (
                <div key={genre} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{genre}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(count / analytics.likedMovies) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No genre data available</p>
          )}
        </div>

        {/* Favorite Directors */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Favorite Directors</h3>
          {getTopDirectors().length > 0 ? (
            <div className="space-y-3">
              {getTopDirectors().map(([director, count]) => (
                <div key={director} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{director}</span>
                  <span className="text-sm text-gray-600">{count} movies</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No director data available</p>
          )}
        </div>

        {/* Year Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Year Preferences</h3>
          {Object.keys(analytics.yearDistribution).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(analytics.yearDistribution)
                .sort(([a], [b]) => b - a)
                .slice(0, 5)
                .map(([year, count]) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{year}</span>
                    <span className="text-sm text-gray-600">{count} movies</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No year data available</p>
          )}
        </div>
      </div>

      {/* Recommendation Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendation Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {analytics.recommendationAccuracy}%
            </div>
            <p className="text-gray-600">Positive Rating Rate</p>
            <p className="text-sm text-gray-500 mt-1">
              {analytics.likedMovies + analytics.dislikedMovies > 0 
                ? `${analytics.likedMovies} out of ${analytics.likedMovies + analytics.dislikedMovies} movies rated positively`
                : 'No movies rated yet'
              }
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {recommendations.length}
            </div>
            <p className="text-gray-600">Current Recommendations</p>
            <p className="text-sm text-gray-500 mt-1">
              Based on your preferences and current algorithm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
