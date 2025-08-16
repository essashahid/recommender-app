from typing import List, Dict
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ..models import Movie


class ContentBasedRecommender:
    def __init__(self):
        self.movies_df: pd.DataFrame = None
        self.tfidf_matrix = None
        self.tfidf_vectorizer = None
        self.cosine_sim = None
        
    def fit(self, movies: List[Movie]):
        """Train the content-based model with movie data."""
        # Convert movies to DataFrame
        movies_data = [movie.dict() for movie in movies]
        self.movies_df = pd.DataFrame(movies_data)
        
        # Create feature text by combining genre, director, and description
        self.movies_df['features'] = (
            self.movies_df['genre'] + ' ' + 
            self.movies_df['director'] + ' ' + 
            self.movies_df['description']
        )
        
        # Create TF-IDF matrix
        self.tfidf_vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=5000,
            ngram_range=(1, 2)
        )
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.movies_df['features'])
        
        # Compute cosine similarity matrix
        self.cosine_sim = cosine_similarity(self.tfidf_matrix)
        
    def get_recommendations(
        self, 
        liked_movies: List[int], 
        disliked_movies: List[int], 
        limit: int = 10
    ) -> List[int]:
        """Get movie recommendations based on liked/disliked movies."""
        if not liked_movies:
            # If no likes, return top-rated movies
            return self._get_top_rated_movies(limit, disliked_movies)
        
        # Get indices of liked movies
        liked_indices = []
        for movie_id in liked_movies:
            idx = self.movies_df[self.movies_df['id'] == movie_id].index
            if len(idx) > 0:
                liked_indices.append(idx[0])
        
        if not liked_indices:
            return self._get_top_rated_movies(limit, disliked_movies)
        
        # Calculate average similarity scores for liked movies
        similarity_scores = np.zeros(len(self.movies_df))
        for idx in liked_indices:
            similarity_scores += self.cosine_sim[idx]
        similarity_scores /= len(liked_indices)
        
        # Create a list of (movie_index, similarity_score) tuples
        movie_scores = list(enumerate(similarity_scores))
        
        # Sort movies by similarity score
        movie_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Get movie IDs, excluding already liked/disliked movies
        excluded_movies = set(liked_movies + disliked_movies)
        recommendations = []
        
        for idx, score in movie_scores:
            movie_id = self.movies_df.iloc[idx]['id']
            if movie_id not in excluded_movies and len(recommendations) < limit:
                recommendations.append(movie_id)
        
        return recommendations
    
    def _get_top_rated_movies(self, limit: int, excluded_movies: List[int]) -> List[int]:
        """Get top-rated movies as fallback recommendations."""
        excluded_set = set(excluded_movies)
        top_movies = self.movies_df.sort_values('rating', ascending=False)
        
        recommendations = []
        for _, movie in top_movies.iterrows():
            if movie['id'] not in excluded_set and len(recommendations) < limit:
                recommendations.append(movie['id'])
        
        return recommendations
