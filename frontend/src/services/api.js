import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const movieAPI = {
  // Get all movies
  getAllMovies: async () => {
    const response = await api.get('/api/items');
    return response.data;
  },

  // Like a movie
  likeMovie: async (userId, movieId) => {
    const response = await api.post('/api/like', {
      user_id: userId,
      movie_id: movieId,
      liked: true
    });
    return response.data;
  },

  // Dislike a movie
  dislikeMovie: async (userId, movieId) => {
    const response = await api.post('/api/dislike', {
      user_id: userId,
      movie_id: movieId,
      liked: false
    });
    return response.data;
  },

  // Get recommendations
  getRecommendations: async (userId, mode = 'content_based', limit = 10) => {
    const response = await api.post('/api/recommend', {
      user_id: userId,
      mode: mode,
      limit: limit
    });
    return response.data;
  },

  // Get user preferences
  getUserPreferences: async (userId) => {
    const response = await api.get(`/api/user/${userId}/preferences`);
    return response.data;
  },

  // Set recommendation mode
  setRecommendationMode: async (mode) => {
    const response = await api.post('/api/mode', {
      mode: mode
    });
    return response.data;
  },

  // Get current recommendation mode
  getRecommendationMode: async () => {
    const response = await api.get('/api/mode');
    return response.data;
  }
};

export default api;
