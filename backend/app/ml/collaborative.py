from typing import List, Dict
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from ..models import Movie


class CollaborativeRecommender:
    def __init__(self):
        self.movies_df: pd.DataFrame = None
        self.user_preferences: Dict[str, Dict[int, bool]] = {}
        self.user_movie_matrix: pd.DataFrame = None
        
    def fit(self, movies: List[Movie]):
        """Initialize the collaborative filtering model with movie data."""
        movies_data = [movie.dict() for movie in movies]
        self.movies_df = pd.DataFrame(movies_data)
        
    def update_user_preferences(self, user_id: str, movie_id: int, liked: bool):
        """Update user preferences for collaborative filtering."""
        if user_id not in self.user_preferences:
            self.user_preferences[user_id] = {}
        self.user_preferences[user_id][movie_id] = liked
        
    def _build_user_movie_matrix(self):
        """Build user-movie interaction matrix."""
        if not self.user_preferences:
            return None
            
        # Create a list of all unique users and movies
        all_users = list(self.user_preferences.keys())
        all_movies = set()
        for user_prefs in self.user_preferences.values():
            all_movies.update(user_prefs.keys())
        all_movies = sorted(list(all_movies))
        
        # Build the matrix
        matrix_data = []
        for user in all_users:
            user_row = []
            for movie in all_movies:
                if movie in self.user_preferences[user]:
                    # Convert boolean to numeric: True (like) = 1, False (dislike) = -1
                    user_row.append(1 if self.user_preferences[user][movie] else -1)
                else:
                    user_row.append(0)  # No preference
            matrix_data.append(user_row)
        
        self.user_movie_matrix = pd.DataFrame(
            matrix_data, 
            index=all_users, 
            columns=all_movies
        )
        
    def get_recommendations(
        self, 
        user_id: str,
        liked_movies: List[int], 
        disliked_movies: List[int], 
        limit: int = 10
    ) -> List[int]:
        """Get movie recommendations using collaborative filtering."""
        self._build_user_movie_matrix()
        
        if (self.user_movie_matrix is None or 
            user_id not in self.user_movie_matrix.index or
            len(self.user_movie_matrix) < 2):
            # Fallback to content-based approach (top-rated movies)
            return self._get_top_rated_movies(limit, liked_movies + disliked_movies)
        
        # Get user similarity matrix
        user_similarity = cosine_similarity(self.user_movie_matrix.values)
        user_similarity_df = pd.DataFrame(
            user_similarity,
            index=self.user_movie_matrix.index,
            columns=self.user_movie_matrix.index
        )
        
        # Find similar users (excluding the target user)
        target_user_similarities = user_similarity_df[user_id].drop(user_id)
        
        if target_user_similarities.empty:
            return self._get_top_rated_movies(limit, liked_movies + disliked_movies)
        
        # Get top similar users
        similar_users = target_user_similarities.sort_values(ascending=False).head(5)
        
        # Aggregate recommendations from similar users
        movie_scores = {}
        excluded_movies = set(liked_movies + disliked_movies)
        
        for similar_user, similarity_score in similar_users.items():
            if similarity_score <= 0:
                continue
                
            user_prefs = self.user_preferences.get(similar_user, {})
            for movie_id, liked in user_prefs.items():
                if movie_id not in excluded_movies and liked:  # Only consider liked movies
                    if movie_id not in movie_scores:
                        movie_scores[movie_id] = 0
                    movie_scores[movie_id] += similarity_score
        
        # Sort movies by aggregated scores
        if not movie_scores:
            return self._get_top_rated_movies(limit, liked_movies + disliked_movies)
        
        recommended_movies = sorted(
            movie_scores.items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        return [movie_id for movie_id, score in recommended_movies[:limit]]
    
    def _get_top_rated_movies(self, limit: int, excluded_movies: List[int]) -> List[int]:
        """Get top-rated movies as fallback recommendations."""
        excluded_set = set(excluded_movies)
        top_movies = self.movies_df.sort_values('rating', ascending=False)
        
        recommendations = []
        for _, movie in top_movies.iterrows():
            if movie['id'] not in excluded_set and len(recommendations) < limit:
                recommendations.append(movie['id'])
        
        return recommendations
