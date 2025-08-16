import React, { useState, useEffect } from 'react';
import { AppProvider, useApp, ActionTypes } from './context/AppContext';
import Navigation from './components/Navigation';
import Catalog from './components/Catalog';
import Recommendations from './components/Recommendations';
import { movieAPI } from './services/api';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const { state, dispatch } = useApp();
  const { userId } = state;

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const preferences = await movieAPI.getUserPreferences(userId);
      dispatch({ type: ActionTypes.SET_USER_PREFERENCES, payload: preferences });
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && <Catalog />}
        {activeTab === 'recommendations' && <Recommendations />}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Movie Recommender System - Built with FastAPI & React
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;