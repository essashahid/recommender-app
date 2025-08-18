from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class RecommendationMode(str, Enum):
    COLLABORATIVE = "collaborative"
    CONTENT_BASED = "content_based"
    HYBRID = "hybrid"


class Movie(BaseModel):
    id: int
    title: str
    genre: str
    year: int
    director: str
    description: str
    rating: float
    poster_url: Optional[str] = None
    trailer_id: Optional[str] = None


class UserPreference(BaseModel):
    user_id: str
    movie_id: int
    liked: bool  # True for like, False for dislike


class RecommendationRequest(BaseModel):
    user_id: str
    mode: RecommendationMode = RecommendationMode.CONTENT_BASED
    limit: int = 10


class RecommendationResponse(BaseModel):
    recommendations: List[Movie]
    mode: RecommendationMode
    user_id: str


class ModeUpdateRequest(BaseModel):
    mode: RecommendationMode


class UserPreferencesResponse(BaseModel):
    user_id: str
    liked_movies: List[int]
    disliked_movies: List[int]
