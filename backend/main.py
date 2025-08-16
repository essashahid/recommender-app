from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.recommendations import router as recommendations_router

# Create FastAPI app
app = FastAPI(
    title="Movie Recommender API",
    description="A movie recommendation system with collaborative and content-based filtering",
    version="1.0.0"
)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recommendations_router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Movie Recommender API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "movies": "/api/items",
            "like": "/api/like",
            "dislike": "/api/dislike", 
            "recommend": "/api/recommend",
            "mode": "/api/mode"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
