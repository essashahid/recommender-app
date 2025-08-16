from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models import (
    Movie, 
    UserPreference, 
    RecommendationRequest, 
    RecommendationResponse,
    ModeUpdateRequest,
    RecommendationMode,
    UserPreferencesResponse
)
from ..data_service import DataService

router = APIRouter(prefix="/api", tags=["recommendations"])

# Global data service instance
data_service = DataService()


@router.get("/items", response_model=List[Movie])
async def get_all_movies():
    """Get all available movies."""
    return data_service.get_all_movies()


@router.post("/like")
async def like_movie(preference: UserPreference):
    """Mark a movie as liked by user."""
    try:
        data_service.add_user_preference(
            preference.user_id, 
            preference.movie_id, 
            True
        )
        return {"message": "Movie liked successfully", "user_id": preference.user_id, "movie_id": preference.movie_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/dislike")
async def dislike_movie(preference: UserPreference):
    """Mark a movie as disliked by user."""
    try:
        data_service.add_user_preference(
            preference.user_id, 
            preference.movie_id, 
            False
        )
        return {"message": "Movie disliked successfully", "user_id": preference.user_id, "movie_id": preference.movie_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """Get movie recommendations for a user."""
    try:
        recommendations = data_service.get_recommendations(
            request.user_id,
            request.mode,
            request.limit
        )
        
        return RecommendationResponse(
            recommendations=recommendations,
            mode=request.mode,
            user_id=request.user_id
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/user/{user_id}/preferences", response_model=UserPreferencesResponse)
async def get_user_preferences(user_id: str):
    """Get user's current preferences."""
    try:
        prefs = data_service.get_user_preferences(user_id)
        return UserPreferencesResponse(
            user_id=user_id,
            liked_movies=prefs["liked_movies"],
            disliked_movies=prefs["disliked_movies"]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/mode")
async def set_recommendation_mode(request: ModeUpdateRequest):
    """Set the recommendation mode."""
    try:
        data_service.set_recommendation_mode(request.mode)
        return {
            "message": f"Recommendation mode set to {request.mode.value}",
            "mode": request.mode.value
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/mode")
async def get_recommendation_mode():
    """Get the current recommendation mode."""
    try:
        current_mode = data_service.get_recommendation_mode()
        return {"mode": current_mode.value}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
