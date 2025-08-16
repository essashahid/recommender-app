import pandas as pd
from typing import List, Dict
from pathlib import Path
from .models import Movie, UserPreference, RecommendationMode
from .ml.content_based import ContentBasedRecommender
from .ml.collaborative import CollaborativeRecommender


class DataService:
    def __init__(self):
        self.movies: List[Movie] = []
        self.user_preferences: Dict[str, Dict[int, bool]] = {}  # user_id -> {movie_id: liked}
        self.content_recommender = ContentBasedRecommender()
        self.collaborative_recommender = CollaborativeRecommender()
        self.current_mode = RecommendationMode.CONTENT_BASED
        self._load_movies()
        self._initialize_recommenders()
    
    def _load_movies(self):
        """Load movies from CSV file."""
        csv_path = Path(__file__).parent.parent / "data" / "movies.csv"
        df = pd.read_csv(csv_path)
        
        self.movies = []
        for _, row in df.iterrows():
            movie = Movie(
                id=int(row['id']),
                title=row['title'],
                genre=row['genre'],
                year=int(row['year']),
                director=row['director'],
                description=row['description'],
                rating=float(row['rating'])
            )
            self.movies.append(movie)
    
    def _initialize_recommenders(self):
        """Initialize both recommender systems."""
        self.content_recommender.fit(self.movies)
        self.collaborative_recommender.fit(self.movies)
    
    def get_all_movies(self) -> List[Movie]:
        """Get all available movies."""
        return self.movies
    
    def get_movie_by_id(self, movie_id: int) -> Movie:
        """Get a specific movie by ID."""
        for movie in self.movies:
            if movie.id == movie_id:
                return movie
        raise ValueError(f"Movie with ID {movie_id} not found")
    
    def add_user_preference(self, user_id: str, movie_id: int, liked: bool):
        """Add or update user preference for a movie."""
        if user_id not in self.user_preferences:
            self.user_preferences[user_id] = {}
        
        self.user_preferences[user_id][movie_id] = liked
        
        # Update collaborative recommender
        self.collaborative_recommender.update_user_preferences(user_id, movie_id, liked)
    
    def get_user_preferences(self, user_id: str) -> Dict[str, List[int]]:
        """Get user's liked and disliked movies."""
        if user_id not in self.user_preferences:
            return {"liked_movies": [], "disliked_movies": []}
        
        prefs = self.user_preferences[user_id]
        liked_movies = [movie_id for movie_id, liked in prefs.items() if liked]
        disliked_movies = [movie_id for movie_id, liked in prefs.items() if not liked]
        
        return {
            "liked_movies": liked_movies,
            "disliked_movies": disliked_movies
        }
    
    def get_recommendations(self, user_id: str, mode: RecommendationMode, limit: int = 10) -> List[Movie]:
        """Get movie recommendations for a user."""
        user_prefs = self.get_user_preferences(user_id)
        liked_movies = user_prefs["liked_movies"]
        disliked_movies = user_prefs["disliked_movies"]
        
        if mode == RecommendationMode.CONTENT_BASED:
            recommended_ids = self.content_recommender.get_recommendations(
                liked_movies, disliked_movies, limit
            )
        else:  # COLLABORATIVE
            recommended_ids = self.collaborative_recommender.get_recommendations(
                user_id, liked_movies, disliked_movies, limit
            )
        
        # Convert IDs to Movie objects
        recommendations = []
        for movie_id in recommended_ids:
            try:
                movie = self.get_movie_by_id(movie_id)
                recommendations.append(movie)
            except ValueError:
                continue  # Skip if movie not found
        
        return recommendations
    
    def set_recommendation_mode(self, mode: RecommendationMode):
        """Set the current recommendation mode."""
        self.current_mode = mode
    
    def get_recommendation_mode(self) -> RecommendationMode:
        """Get the current recommendation mode."""
        return self.current_mode
