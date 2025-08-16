import React from 'react';
import { useApp, ActionTypes } from '../context/AppContext';
import { movieAPI } from '../services/api';

const MovieCard = ({ movie, showActions = true }) => {
  const { state, dispatch } = useApp();
  const { userPreferences, userId } = state;

  const isLiked = userPreferences.liked_movies.includes(movie.id);
  const isDisliked = userPreferences.disliked_movies.includes(movie.id);

  const handleLike = async () => {
    try {
      await movieAPI.likeMovie(userId, movie.id);
      dispatch({ type: ActionTypes.LIKE_MOVIE, payload: movie.id });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const handleDislike = async () => {
    try {
      await movieAPI.dislikeMovie(userId, movie.id);
      dispatch({ type: ActionTypes.DISLIKE_MOVIE, payload: movie.id });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="text-sm font-medium text-gray-700">{movie.rating}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Genre:</span> {movie.genre}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Year:</span> {movie.year}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Director:</span> {movie.director}
          </p>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{movie.description}</p>
        
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                isLiked
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              👍 {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleDislike}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                isDisliked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              👎 {isDisliked ? 'Disliked' : 'Dislike'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
