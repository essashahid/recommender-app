# 🎬 Movie Recommender System

A full-stack movie recommendation system that supports both **collaborative filtering** and **content-based filtering** algorithms. Users can browse movies, like/dislike them, and get personalized recommendations in real-time.

## 🚀 Features

- **Dual Recommendation Algorithms**:
  - Content-based filtering (using TF-IDF and cosine similarity)
  - Collaborative filtering (user-based similarity)
- **Interactive Frontend**: Clean React UI with real-time updates
- **RESTful API**: FastAPI backend with automatic OpenAPI documentation
- **Real-time Updates**: Instant recommendations after rating movies
- **Responsive Design**: Works on desktop and mobile devices
- **Docker Support**: Easy deployment with Docker containers

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **scikit-learn**: Machine learning algorithms
- **pandas & numpy**: Data processing
- **uvicorn**: ASGI server

### Frontend
- **React**: User interface framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Context API**: State management

## 📁 Project Structure

```
recommender-app/
├── backend/
│   ├── app/
│   │   ├── ml/
│   │   │   ├── collaborative.py      # Collaborative filtering algorithm
│   │   │   ├── content_based.py      # Content-based filtering algorithm
│   │   │   └── __init__.py
│   │   ├── routes/
│   │   │   ├── recommendations.py    # API endpoints
│   │   │   └── __init__.py
│   │   ├── data_service.py           # Data management service
│   │   ├── models.py                 # Pydantic models
│   │   └── __init__.py
│   ├── data/
│   │   └── movies.csv               # Sample movie dataset
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt             # Python dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Catalog.jsx          # Movie catalog page
│   │   │   ├── MovieCard.jsx        # Individual movie component
│   │   │   ├── Navigation.jsx       # Navigation bar
│   │   │   └── Recommendations.jsx  # Recommendations page
│   │   ├── context/
│   │   │   └── AppContext.jsx       # React Context for state
│   │   ├── services/
│   │   │   └── api.js              # API service functions
│   │   ├── App.jsx                 # Main App component
│   │   └── main.jsx                # React entry point
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚦 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Option 1: Local Development

#### Backend Setup
```bash
cd recommender-app/backend
pip install -r requirements.txt
python main.py
```
The backend will be available at `http://localhost:8000`

#### Frontend Setup
```bash
cd recommender-app/frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

### Option 2: Docker (Recommended)

```bash
cd recommender-app
docker-compose up --build
```

This will start both backend and frontend services:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## 📖 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

### Key Endpoints

- `GET /api/items` - Get all movies
- `POST /api/like` - Like a movie
- `POST /api/dislike` - Dislike a movie
- `POST /api/recommend` - Get recommendations
- `GET /api/user/{user_id}/preferences` - Get user preferences
- `POST /api/mode` - Set recommendation algorithm
- `GET /api/mode` - Get current algorithm mode

### Example API Usage

```bash
# Get all movies
curl http://localhost:8000/api/items

# Like a movie
curl -X POST http://localhost:8000/api/like \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user_1", "movie_id": 1, "liked": true}'

# Get recommendations
curl -X POST http://localhost:8000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user_1", "mode": "content_based", "limit": 5}'
```

## 🤖 Machine Learning Algorithms

### Content-Based Filtering
- Uses TF-IDF vectorization on movie features (genre, director, description)
- Calculates cosine similarity between movies
- Recommends movies similar to liked ones

### Collaborative Filtering
- Builds user-movie interaction matrix
- Finds similar users using cosine similarity
- Recommends movies liked by similar users

## 🎯 Usage Guide

1. **Browse Movies**: Start on the "Movie Catalog" tab to see all available movies
2. **Rate Movies**: Click 👍 Like or 👎 Dislike on movies you've seen
3. **Get Recommendations**: Switch to "Recommendations" tab to see personalized suggestions
4. **Toggle Algorithms**: Use the "Content-Based" and "Collaborative" buttons to switch between recommendation modes
5. **Real-time Updates**: Recommendations update automatically as you rate more movies

## 🎨 Customization

### Adding More Movies
Edit `backend/data/movies.csv` and restart the backend:

```csv
id,title,genre,year,director,description,rating
16,New Movie,Action,2024,Director Name,Movie description,8.5
```

### Changing Recommendation Parameters
Modify the algorithms in:
- `backend/app/ml/content_based.py`
- `backend/app/ml/collaborative.py`

### UI Customization
Update React components in `frontend/src/components/` and styles in TailwindCSS classes.

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest  # If you add tests
```

### Frontend Testing
```bash
cd frontend
npm test  # If you add tests
```

## 🚀 Deployment

### Production Docker Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Environment Variables
Create `.env` files for production:

Backend `.env`:
```
ENVIRONMENT=production
CORS_ORIGINS=https://yourdomain.com
```

Frontend `.env`:
```
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Sample movie data inspired by IMDb top-rated movies
- Built with modern ML and web technologies
- Designed for educational and demonstration purposes

---

**Happy Movie Recommending! 🍿**
