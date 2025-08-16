import React, { useEffect } from 'react';
import { useApp, ActionTypes } from '../context/AppContext';
import { movieAPI } from '../services/api';
import MovieCard from './MovieCard';

const Catalog = () => {
  const { state, dispatch } = useApp();
  const { movies, loading, error } = state;

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const moviesData = await movieAPI.getAllMovies();
      dispatch({ type: ActionTypes.SET_MOVIES, payload: moviesData });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Movie Catalog</h2>
        <p className="text-gray-600">Browse and rate movies to get personalized recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showActions={true} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
