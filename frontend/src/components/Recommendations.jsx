import React, { useEffect } from 'react';
import { useApp, ActionTypes } from '../context/AppContext';
import { movieAPI } from '../services/api';
import MovieCard from './MovieCard';

const Recommendations = () => {
  const { state, dispatch } = useApp();
  const { recommendations, currentMode, userId, userPreferences, loading, error } = state;

  useEffect(() => {
    loadRecommendations();
  }, [currentMode, userPreferences]);

  const loadRecommendations = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const data = await movieAPI.getRecommendations(userId, currentMode, 10);
      dispatch({ type: ActionTypes.SET_RECOMMENDATIONS, payload: data.recommendations });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const handleModeChange = async (newMode) => {
    try {
      await movieAPI.setRecommendationMode(newMode);
      dispatch({ type: ActionTypes.SET_MODE, payload: newMode });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const hasPreferences = userPreferences.liked_movies.length > 0 || userPreferences.disliked_movies.length > 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Recommendations for You</h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleModeChange('content_based')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentMode === 'content_based'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Content-Based
            </button>
            <button
              onClick={() => handleModeChange('collaborative')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentMode === 'collaborative'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Collaborative
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <span className="font-medium">Current Mode:</span> {
              currentMode === 'content_based' ? 'Content-Based Filtering' : 'Collaborative Filtering'
            }
          </p>
          <p className="text-blue-700 text-sm mt-1">
            {currentMode === 'content_based' 
              ? 'Recommendations based on movie features and your preferences'
              : 'Recommendations based on similar users\' preferences'
            }
          </p>
        </div>
      </div>

      {!hasPreferences ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No preferences yet</h3>
          <p className="text-gray-600 mb-4">
            Start by liking or disliking some movies in the catalog to get personalized recommendations!
          </p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">
            Try rating more movies or switching recommendation modes.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-gray-600">
              Based on your {userPreferences.liked_movies.length} likes and {userPreferences.disliked_movies.length} dislikes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showActions={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
