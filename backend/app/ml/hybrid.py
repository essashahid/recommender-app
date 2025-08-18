import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
from ..models import Movie


class HybridRecommender:
    def __init__(self, content_weight=0.6, collaborative_weight=0.4):
        """
        Initialize hybrid recommender with configurable weights.
        
        Args:
            content_weight: Weight for content-based recommendations (0-1)
            collaborative_weight: Weight for collaborative recommendations (0-1)
        """
        self.content_weight = content_weight
        self.collaborative_weight = collaborative_weight
        self.movies = []
        self.tfidf_matrix = None
        self.tfidf_vectorizer = None
        self.user_movie_matrix = {}
        self.user_similarities = {}
        self._fitted = False
    
    def fit(self, movies: List[Movie]):
        """Fit the hybrid recommender with movie data."""
        self.movies = movies
        self._fit_content_based()
        self._fitted = True
    
    def _fit_content_based(self):
        """Fit the content-based component."""
        # Create feature text for each movie
        movie_features = []
        for movie in self.movies:
            features = f"{movie.title} {movie.genre} {movie.director} {movie.description}"
            movie_features.append(features)
        
        # Create TF-IDF matrix
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(movie_features)
    
    def update_user_preferences(self, user_id: str, movie_id: int, liked: bool):
        """Update user preferences for collaborative filtering."""
        if user_id not in self.user_movie_matrix:
            self.user_movie_matrix[user_id] = {}
        
        self.user_movie_matrix[user_id][movie_id] = 1 if liked else -1
        
        # Clear cached similarities for this user
        if user_id in self.user_similarities:
            del self.user_similarities[user_id]
    
    def _get_content_based_scores(self, liked_movies: List[int], disliked_movies: List[int]) -> Dict[int, float]:
        """Get content-based recommendation scores."""
        if not liked_movies and not disliked_movies:
            return {movie.id: 0.0 for movie in self.movies}
        
        # Create user profile vector
        user_profile = np.zeros(self.tfidf_matrix.shape[1])
        
        # Add liked movies to profile
        for movie_id in liked_movies:
            movie_idx = next(i for i, movie in enumerate(self.movies) if movie.id == movie_id)
            user_profile += self.tfidf_matrix[movie_idx].toarray().flatten()
        
        # Subtract disliked movies from profile
        for movie_id in disliked_movies:
            movie_idx = next(i for i, movie in enumerate(self.movies) if movie.id == movie_id)
            user_profile -= self.tfidf_matrix[movie_idx].toarray().flatten()
        
        # Normalize profile
        if np.linalg.norm(user_profile) > 0:
            user_profile = user_profile / np.linalg.norm(user_profile)
        
        # Calculate similarities with all movies
        similarities = cosine_similarity([user_profile], self.tfidf_matrix.toarray())[0]
        
        # Convert to dictionary
        scores = {}
        for i, movie in enumerate(self.movies):
            if movie.id not in liked_movies and movie.id not in disliked_movies:
                scores[movie.id] = float(similarities[i])
            else:
                scores[movie.id] = -1.0  # Exclude already rated movies
        
        return scores
    
    def _get_collaborative_scores(self, user_id: str, liked_movies: List[int], disliked_movies: List[int]) -> Dict[int, float]:
        """Get collaborative filtering recommendation scores."""
        if user_id not in self.user_movie_matrix or len(self.user_movie_matrix) < 2:
            return {movie.id: 0.0 for movie in self.movies}
        
        # Find similar users
        similar_users = self._find_similar_users(user_id)
        
        if not similar_users:
            return {movie.id: 0.0 for movie in self.movies}
        
        # Calculate predicted ratings
        scores = {}
        for movie in self.movies:
            if movie.id in liked_movies or movie.id in disliked_movies:
                scores[movie.id] = -1.0  # Exclude already rated movies
                continue
            
            # Calculate weighted average rating from similar users
            numerator = 0
            denominator = 0
            
            for sim_user_id, similarity in similar_users:
                if movie.id in self.user_movie_matrix[sim_user_id]:
                    rating = self.user_movie_matrix[sim_user_id][movie.id]
                    numerator += similarity * rating
                    denominator += abs(similarity)
            
            if denominator > 0:
                scores[movie.id] = numerator / denominator
            else:
                scores[movie.id] = 0.0
        
        return scores
    
    def _find_similar_users(self, user_id: str) -> List[tuple]:
        """Find users similar to the given user."""
        if user_id in self.user_similarities:
            return self.user_similarities[user_id]
        
        if user_id not in self.user_movie_matrix:
            return []
        
        user_profile = self.user_movie_matrix[user_id]
        similarities = []
        
        for other_user_id, other_profile in self.user_movie_matrix.items():
            if other_user_id == user_id:
                continue
            
            # Calculate Pearson correlation
            common_movies = set(user_profile.keys()) & set(other_profile.keys())
            if len(common_movies) < 2:
                continue
            
            # Calculate correlation
            user_ratings = [user_profile[movie_id] for movie_id in common_movies]
            other_ratings = [other_profile[movie_id] for movie_id in common_movies]
            
            correlation = np.corrcoef(user_ratings, other_ratings)[0, 1]
            if not np.isnan(correlation):
                similarities.append((other_user_id, correlation))
        
        # Sort by similarity and take top 10
        similarities.sort(key=lambda x: abs(x[1]), reverse=True)
        similarities = similarities[:10]
        
        self.user_similarities[user_id] = similarities
        return similarities
    
    def get_recommendations(self, user_id: str, liked_movies: List[int], disliked_movies: List[int], limit: int = 10) -> List[int]:
        """Get hybrid recommendations combining content-based and collaborative filtering."""
        if not self._fitted:
            raise ValueError("Recommender must be fitted before getting recommendations")
        
        # Get scores from both methods
        content_scores = self._get_content_based_scores(liked_movies, disliked_movies)
        collaborative_scores = self._get_collaborative_scores(user_id, liked_movies, disliked_movies)
        
        # Combine scores with weights
        combined_scores = {}
        for movie_id in content_scores:
            if movie_id in collaborative_scores:
                combined_score = (
                    self.content_weight * content_scores[movie_id] +
                    self.collaborative_weight * collaborative_scores[movie_id]
                )
                combined_scores[movie_id] = combined_score
        
        # Sort by combined score and return top recommendations
        sorted_movies = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
        recommended_ids = [movie_id for movie_id, score in sorted_movies[:limit]]
        
        return recommended_ids
    
    def get_recommendation_explanation(self, user_id: str, movie_id: int, liked_movies: List[int], disliked_movies: List[int]) -> Dict:
        """Get explanation for why a movie was recommended."""
        if not self._fitted:
            return {}
        
        movie = next((m for m in self.movies if m.id == movie_id), None)
        if not movie:
            return {}
        
        content_scores = self._get_content_based_scores(liked_movies, disliked_movies)
        collaborative_scores = self._get_collaborative_scores(user_id, liked_movies, disliked_movies)
        
        content_score = content_scores.get(movie_id, 0)
        collaborative_score = collaborative_scores.get(movie_id, 0)
        
        # Find similar movies from user's liked movies
        similar_liked_movies = []
        if liked_movies:
            movie_idx = next(i for i, m in enumerate(self.movies) if m.id == movie_id)
            movie_vector = self.tfidf_matrix[movie_idx].toarray().flatten()
            
            for liked_id in liked_movies:
                liked_idx = next(i for i, m in enumerate(self.movies) if m.id == liked_id)
                liked_vector = self.tfidf_matrix[liked_idx].toarray().flatten()
                similarity = cosine_similarity([movie_vector], [liked_vector])[0][0]
                similar_liked_movies.append((liked_id, similarity))
            
            similar_liked_movies.sort(key=lambda x: x[1], reverse=True)
            similar_liked_movies = similar_liked_movies[:3]
        
        # Find similar users who liked this movie
        similar_users = []
        if user_id in self.user_movie_matrix:
            similar_users_data = self._find_similar_users(user_id)
            for sim_user_id, similarity in similar_users_data:
                if movie_id in self.user_movie_matrix[sim_user_id]:
                    rating = self.user_movie_matrix[sim_user_id][movie_id]
                    if rating > 0:
                        similar_users.append((sim_user_id, similarity, rating))
            similar_users.sort(key=lambda x: x[1], reverse=True)
            similar_users = similar_users[:3]
        
        return {
            "movie_id": movie_id,
            "movie_title": movie.title,
            "content_score": round(content_score, 3),
            "collaborative_score": round(collaborative_score, 3),
            "combined_score": round(
                self.content_weight * content_score + self.collaborative_weight * collaborative_score, 3
            ),
            "content_weight": self.content_weight,
            "collaborative_weight": self.collaborative_weight,
            "similar_liked_movies": [
                {
                    "movie_id": movie_id,
                    "movie_title": next(m.title for m in self.movies if m.id == movie_id),
                    "similarity": round(similarity, 3)
                }
                for movie_id, similarity in similar_liked_movies
            ],
            "similar_users": [
                {
                    "user_id": user_id,
                    "similarity": round(similarity, 3),
                    "rating": rating
                }
                for user_id, similarity, rating in similar_users
            ]
        }
