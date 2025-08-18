import React, { useEffect, useState } from 'react';
import { useApp, ActionTypes } from '../context/AppContext';
import { movieAPI } from '../services/api';
import MovieCard from './MovieCard';
import SearchAndFilter from './SearchAndFilter';

const Catalog = () => {
  const { state, dispatch } = useApp();
  const { movies, loading, error } = state;
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

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
      
      <SearchAndFilter 
        movies={movies}
        onFilteredMovies={setFilteredMovies}
        onSearchChange={setSearchTerm}
      />
      
      {searchTerm && (
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredMovies.length} results for "{searchTerm}"
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showActions={true} />
        ))}
      </div>
      
      {filteredMovies.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No movies found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
