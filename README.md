# 🎬🎭🎪 MOVIE RECOMMENDER SYSTEM 🎪🎭🎬

<div align="center">

![Movie Magic](https://img.shields.io/badge/🎬-Movie_Magic-ff6b6b?style=for-the-badge&logo=netflix)
![ML Powered](https://img.shields.io/badge/🤖-ML_Powered-4ecdc4?style=for-the-badge&logo=python)
![Real-time](https://img.shields.io/badge/⚡-Real_time-ffe66d?style=for-the-badge&logo=react)
![Docker Ready](https://img.shields.io/badge/🐳-Docker_Ready-1e90ff?style=for-the-badge&logo=docker)

---

## 🌟 **"In a world where algorithms meet cinema..."** 🌟

**A cinematic full-stack movie recommendation system that brings the magic of machine learning to your movie discovery journey!** 

*Featuring cutting-edge AI algorithms, a stunning React interface, and real-time personalized recommendations that will transform how you discover your next favorite film.* 🎬✨

---

</div>

## 🎬 **THE FEATURES** 🎬

<div align="center">

### 🎪 **"Prepare to be amazed by the future of movie discovery!"** 🎪

</div>

---

### 🧠 **AI-Powered Recommendation Engines**
- **🎯 Content-Based Filtering**: *"Like finding your movie soulmate through cinematic DNA"*
  - TF-IDF vectorization magic ✨
  - Cosine similarity wizardry 🔮
  - Genre, director, and plot analysis 🎭
- **👥 Collaborative Filtering**: *"Discover what movie lovers like you adore"*
  - User similarity algorithms 🤝
  - Community-driven recommendations 🌟
  - Social movie discovery 🎪

### 🎨 **Cinematic User Experience**
- **🎬 Interactive Movie Catalog**: *Browse through our curated collection of cinematic masterpieces*
- **👍👎 Like/Dislike System**: *Rate movies with the power of your emotions*
- **⚡ Real-time Magic**: *Watch recommendations appear like movie credits*
- **📱 Responsive Design**: *From phone screens to cinema screens*

### 🛠️ **Production-Ready Infrastructure**
- **🚀 FastAPI Backend**: *Lightning-fast API responses*
- **🎨 React Frontend**: *Smooth, animated user interface*
- **🐳 Docker Support**: *Deploy anywhere, anytime*
- **📚 Auto-Documentation**: *API docs that read like a script*

## 🎬 **THE CAST & CREW** 🎬

<div align="center">

### 🎭 **"Meet the stars behind the magic!"** 🎭

</div>

---

### 🎬 **Backend Ensemble**
- **🎭 FastAPI**: *The leading actor - Modern Python web framework*
- **🧠 scikit-learn**: *The brain - Machine learning algorithms*
- **📊 pandas & numpy**: *The data wizards - Data processing*
- **⚡ uvicorn**: *The stage manager - ASGI server*

### 🎨 **Frontend Stars**
- **⚛️ React**: *The director - User interface framework*
- **🚀 Vite**: *The cinematographer - Build tool and dev server*
- **🎨 TailwindCSS**: *The costume designer - Utility-first CSS framework*
- **🌐 Axios**: *The messenger - HTTP client for API calls*
- **🎪 Context API**: *The script supervisor - State management*

### 🎪 **Special Effects**
- **🐳 Docker**: *The production studio - Containerization*
- **📚 OpenAPI**: *The screenplay - Auto-generated documentation*
- **🎯 TypeScript**: *The script editor - Type safety*

## 🎬 **BEHIND THE SCENES** 🎬

<div align="center">

### 🎪 **"Take a peek at our movie studio!"** 🎪

</div>

---

```
🎬 recommender-app/
├── 🎭 backend/                    # The Backstage
│   ├── 🧠 app/
│   │   ├── 🎯 ml/
│   │   │   ├── collaborative.py      # 👥 "The Social Network" algorithm
│   │   │   ├── content_based.py      # 🎭 "The Content Creator" algorithm
│   │   │   └── __init__.py
│   │   ├── 🎪 routes/
│   │   │   ├── recommendations.py    # 🎬 "The Director" - API endpoints
│   │   │   └── __init__.py
│   │   ├── data_service.py           # 🎪 "The Stage Manager"
│   │   ├── models.py                 # 📝 "The Screenplay"
│   │   └── __init__.py
│   ├── 📊 data/
│   │   └── movies.csv               # 🎬 "The Movie Database"
│   ├── main.py                      # 🎭 "The Main Event"
│   ├── requirements.txt             # 🎪 "The Cast List"
│   └── Dockerfile                   # 🐳 "The Studio"
├── 🎨 frontend/                    # The Front Stage
│   ├── src/
│   │   ├── 🎬 components/
│   │   │   ├── Catalog.jsx          # 🎭 "The Movie Theater"
│   │   │   ├── MovieCard.jsx        # 🎪 "The Movie Poster"
│   │   │   ├── Navigation.jsx       # 🎬 "The Usher"
│   │   │   └── Recommendations.jsx  # 🎯 "The Critic"
│   │   ├── 🎪 context/
│   │   │   └── AppContext.jsx       # 🎭 "The Script Supervisor"
│   │   ├── 🌐 services/
│   │   │   └── api.js              # 📞 "The Communication Hub"
│   │   ├── App.jsx                 # 🎬 "The Main Character"
│   │   └── main.jsx                # 🎭 "The Opening Scene"
│   ├── package.json                # 🎪 "The Production Notes"
│   └── Dockerfile                  # 🐳 "The Studio"
├── docker-compose.yml              # 🎬 "The Production Schedule"
└── README.md                       # 🎭 "The Movie Poster"
```

## 🎬 **"ACTION!" - LIGHTS, CAMERA, LAUNCH!** 🎬

<div align="center">

### 🎪 **"Ready to experience the magic? Let's roll!"** 🎪

</div>

---

### 🎭 **Prerequisites - "The Cast Call"**
- **🐍 Python 3.10+**: *The leading actor*
- **🌳 Node.js 18+**: *The supporting cast*
- **📦 npm or yarn**: *The stage crew*

---

### 🎬 **Option 1: Local Development - "The Indie Film"**

#### 🎭 **Backend Setup - "Setting the Stage"**
```bash
cd recommender-app/backend
pip install -r requirements.txt
python main.py
```
*🎪 The backend will be available at `http://localhost:8000`*

#### 🎨 **Frontend Setup - "The Main Show"**
```bash
cd recommender-app/frontend
npm install
npm run dev
```
*🎬 The frontend will be available at `http://localhost:3000`*

---

### 🐳 **Option 2: Docker - "The Blockbuster Production"**

```bash
cd recommender-app
docker-compose up --build
```

*🎪 This will start both backend and frontend services:*
- **🎭 Backend**: `http://localhost:8000`
- **🎨 Frontend**: `http://localhost:3000`

---

### 🚀 **Option 3: One-Click Launch - "The Premiere"**

```bash
cd recommender-app
./start_servers.sh
```

*🎬 Lights, camera, action! Both servers start automatically!*

## 📚 **THE SCREENPLAY - API Documentation** 📚

<div align="center">

### 🎭 **"Every great movie needs a great script!"** 🎭

</div>

---

*🎪 Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation - it's like having the director's cut with commentary!*

### 🎬 **Key Endpoints - "The Scene Breakdown"**

- **🎭 `GET /api/items`** - *"The Movie Catalog - Browse our collection of cinematic masterpieces"*
- **👍 `POST /api/like`** - *"The Love Scene - Express your affection for a movie"*
- **👎 `POST /api/dislike`** - *"The Breakup Scene - Part ways with movies that don't click"*
- **🎯 `POST /api/recommend`** - *"The Plot Twist - Get personalized movie recommendations"*
- **👤 `GET /api/user/{user_id}/preferences`** - *"The Character Profile - See your movie taste profile"*
- **🎪 `POST /api/mode`** - *"The Director's Choice - Switch between recommendation algorithms"*
- **🎬 `GET /api/mode`** - *"The Current Scene - Check which algorithm is active"*

### 🎬 **Example API Usage - "The Script Samples"**

```bash
# 🎭 Get all movies - "The Opening Credits"
curl http://localhost:8000/api/items

# 👍 Like a movie - "The Love Scene"
curl -X POST http://localhost:8000/api/like \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user_1", "movie_id": 1, "liked": true}'

# 🎯 Get recommendations - "The Plot Twist"
curl -X POST http://localhost:8000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user_1", "mode": "content_based", "limit": 5}'
```

## 🧠 **THE BRAIN - Machine Learning Algorithms** 🧠

<div align="center">

### 🎭 **"Where artificial intelligence meets cinematic intelligence!"** 🎭

</div>

---

### 🎯 **Content-Based Filtering - "The Movie DNA Analyzer"**
- **🧬 TF-IDF Vectorization**: *"Extracting the cinematic DNA from movie features"*
- **📐 Cosine Similarity**: *"Measuring the genetic similarity between movies"*
- **🎭 Feature Analysis**: *"Analyzing genre, director, and plot characteristics"*
- **✨ Magic**: *"Recommends movies that share your favorite movie's DNA"*

### 👥 **Collaborative Filtering - "The Social Network for Movies"**
- **📊 User-Movie Matrix**: *"Building the social graph of movie lovers"*
- **🤝 Similarity Detection**: *"Finding your movie soulmates"*
- **🌟 Community Wisdom**: *"Leveraging the collective taste of movie enthusiasts"*
- **🎪 Discovery**: *"Recommends what people like you adore"*

## 🎬 **THE USER'S JOURNEY - "How to Star in Your Own Movie Discovery Story"** 🎬

<div align="center">

### 🎪 **"Ready to become the protagonist of your movie discovery adventure?"** 🎪

</div>

---

### 🎭 **Act 1: "The Opening Scene"**
1. **🎬 Browse Movies**: *Start on the "Movie Catalog" tab - it's like walking into the most amazing movie theater ever!*

### 🎪 **Act 2: "The Plot Development"**
2. **👍👎 Rate Movies**: *Click 👍 Like or 👎 Dislike on movies you've seen - become the critic you always wanted to be!*

### 🎯 **Act 3: "The Climax"**
3. **🎯 Get Recommendations**: *Switch to "Recommendations" tab - watch as AI magic reveals your next favorite movies!*

### 🎪 **Act 4: "The Plot Twist"**
4. **🎭 Toggle Algorithms**: *Use the "Content-Based" and "Collaborative" buttons - choose your own adventure!*

### 🎬 **Act 5: "The Grand Finale"**
5. **⚡ Real-time Updates**: *Watch recommendations update in real-time - it's like having a personal movie concierge!*

## 🎨 **THE DIRECTOR'S CUT - Customization** 🎨

<div align="center">

### 🎭 **"Want to put your own creative spin on the masterpiece?"** 🎭

</div>

---

### 🎬 **Adding More Movies - "Expanding the Cast"**
*Edit `backend/data/movies.csv` and restart the backend:*

```csv
id,title,genre,year,director,description,rating
16,New Movie,Action,2024,Director Name,Movie description,8.5
```

### 🧠 **Changing Recommendation Parameters - "Tweaking the Script"**
*Modify the algorithms in:*
- **🎯 `backend/app/ml/content_based.py`** - *"The Content Director"*
- **👥 `backend/app/ml/collaborative.py`** - *"The Social Director"*

### 🎨 **UI Customization - "The Visual Effects"**
*Update React components in `frontend/src/components/` and styles in TailwindCSS classes - make it your own cinematic masterpiece!*

## 🧪 **THE DRESS REHEARSAL - Testing** 🧪

<div align="center">

### 🎭 **"Every great performance needs a great rehearsal!"** 🎭

</div>

---

### 🎬 **Backend Testing - "The Technical Rehearsal"**
```bash
cd backend
python -m pytest  # If you add tests
```

### 🎨 **Frontend Testing - "The Dress Rehearsal"**
```bash
cd frontend
npm test  # If you add tests
```

## 🚀 **THE WORLD PREMIERE - Deployment** 🚀

<div align="center">

### 🎪 **"Ready to take your masterpiece to the world stage?"** 🎪

</div>

---

### 🐳 **Production Docker Build - "The Blockbuster Release"**
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### 🌍 **Environment Variables - "The Production Setup"**
*Create `.env` files for production:*

**Backend `.env`:**
```
ENVIRONMENT=production
CORS_ORIGINS=https://yourdomain.com
```

**Frontend `.env`:**
```
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 **THE ENSEMBLE CAST - Contributing** 🤝

<div align="center">

### 🎭 **"Join our cinematic ensemble and help create movie magic!"** 🎭

</div>

---

1. **🎬 Fork the repository** - *"Join our production company"*
2. **🎪 Create a feature branch** - *`git checkout -b feature/amazing-feature`*
3. **🎭 Commit changes** - *`git commit -m 'Add amazing feature'`*
4. **🚀 Push to branch** - *`git push origin feature/amazing-feature`*
5. **🎯 Open a Pull Request** - *"Submit your audition tape"*

## 📝 **THE CREDITS - License** 📝

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **THE THANK YOU SCENE - Acknowledgments** 🙏

- **🎬 Sample movie data** inspired by IMDb top-rated movies
- **🛠️ Built with** modern ML and web technologies
- **🎓 Designed for** educational and demonstration purposes

---

<div align="center">

## 🎬 **"THE END"** 🎬

### 🍿 **"Happy Movie Recommending!"** 🍿

*🎪 Thank you for being part of our cinematic journey!* ✨

</div>
