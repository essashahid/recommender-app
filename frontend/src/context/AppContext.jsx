import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  movies: [],
  recommendations: [],
  userPreferences: {
    liked_movies: [],
    disliked_movies: []
  },
  currentMode: 'content_based',
  userId: 'user_1', // Default user ID
  loading: false,
  error: null
};

// Action types
export const ActionTypes = {
  SET_MOVIES: 'SET_MOVIES',
  SET_RECOMMENDATIONS: 'SET_RECOMMENDATIONS',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_MODE: 'SET_MODE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LIKE_MOVIE: 'LIKE_MOVIE',
  DISLIKE_MOVIE: 'DISLIKE_MOVIE'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_MOVIES:
      return { ...state, movies: action.payload };
    
    case ActionTypes.SET_RECOMMENDATIONS:
      return { ...state, recommendations: action.payload };
    
    case ActionTypes.SET_USER_PREFERENCES:
      return { ...state, userPreferences: action.payload };
    
    case ActionTypes.SET_MODE:
      return { ...state, currentMode: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.LIKE_MOVIE:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          liked_movies: [...state.userPreferences.liked_movies.filter(id => id !== action.payload), action.payload],
          disliked_movies: state.userPreferences.disliked_movies.filter(id => id !== action.payload)
        }
      };
    
    case ActionTypes.DISLIKE_MOVIE:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          disliked_movies: [...state.userPreferences.disliked_movies.filter(id => id !== action.payload), action.payload],
          liked_movies: state.userPreferences.liked_movies.filter(id => id !== action.payload)
        }
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
