# Neon Todo App

A beautiful full-stack todo application with a stunning neon lights UI.

## Features

- User authentication (registration and login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design with neon-themed UI
- JWT-based authentication
- Modern tech stack

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- FastAPI
- Python 3.11+
- SQLModel (SQLAlchemy + Pydantic)
- SQLite
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.11 or higher)
- Docker (optional, for containerized deployment)

### Local Development

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your secret key (DATABASE_URL defaults to SQLite)
   ```

6. Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your backend API URL
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

### Using Docker

To run the entire application with Docker Compose:

```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:8000`.

## Cloud Deployment Options

Instead of Docker, you can deploy the backend to various cloud platforms:

### Deploy to Render

1. Create a free account at [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Choose the following settings:
   - Environment: `Python`
   - Branch: `main`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `DATABASE_URL`: SQLite database URL (default: `sqlite:///./todo.db`)
   - `SECRET_KEY`: Your JWT secret key
6. Deploy!

### Deploy to Railway

1. Create a free account at [Railway](https://railway.app)
2. Create a new project and connect your GitHub repository
3. Select the backend directory
4. Railway will automatically detect the Python project and use the `railway.toml` configuration
5. Add environment variables:
   - `DATABASE_URL`: SQLite database URL (default: `sqlite:///./todo.db`)
   - `SECRET_KEY`: Your JWT secret key
6. Deploy!

### Deploy to Fly.io

1. Install the Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Sign in: `fly auth login`
3. Create a new app: `fly launch --config backend/fly.toml`
4. Deploy: `fly deploy`
5. Add secrets: 
   ```bash
   fly secrets set DATABASE_URL="sqlite:///./todo.db" SECRET_KEY="your-secret-key"
   ```

### Deploy to Heroku

1. Create a free account at [Heroku](https://heroku.com)
2. Install the Heroku CLI
3. Login: `heroku login`
4. Create a new app: `heroku create your-app-name`
5. Set buildpack: `heroku buildpacks:set heroku/python`
6. Add environment variables:
   ```bash
   heroku config:set DATABASE_URL="sqlite:///./todo.db"
   heroku config:set SECRET_KEY="your-secret-key"
   ```
7. Deploy: `git push heroku main`

### Deploy to Hugging Face Spaces (Alternative)

While Hugging Face Spaces is primarily designed for ML demos, you can host simple web applications:

1. Create a free account at [Hugging Face](https://huggingface.co)
2. Create a new Space
3. Choose "Gradio" SDK (though this isn't ideal for FastAPI)
4. Add a `app.py` file that wraps your FastAPI app:

```python
from gradio import networking_utils
from main import app  # Your FastAPI app

# This is a workaround to run FastAPI on Hugging Face Spaces
import uvicorn
from threading import Thread

def run_fastapi_app():
    uvicorn.run(app, host="0.0.0.0", port=7860)

# Run FastAPI in a separate thread
thread = Thread(target=run_fastapi_app, daemon=True)
thread.start()

# Gradio interface (minimal)
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# Todo API")
    gr.Markdown("API is running at `/`")

demo.launch(server_name="0.0.0.0", server_port=7860)
```

Note: This is not the recommended approach for production applications. Traditional cloud platforms like Render, Railway, or Fly.io are better suited for hosting backend APIs.

After deploying your backend to any of these platforms, update your frontend's `NEXT_PUBLIC_API_URL` to point to your deployed backend URL.

## API Documentation

The backend API is documented with Swagger UI. Once the backend is running, visit `http://localhost:8000/docs` to view the API documentation.

## Project Structure

```
hackathon-todo-phase2/
├── frontend/           # Next.js frontend
│   ├── app/            # App Router pages
│   ├── components/     # Reusable components
│   ├── lib/            # Utilities and API clients
│   └── ...
├── backend/            # FastAPI backend
│   ├── routes/         # API route handlers
│   ├── models.py       # Database models
│   ├── auth.py         # Authentication utilities
│   └── main.py         # Main application entry point
└── docker-compose.yml  # Docker configuration
```

## Environment Variables

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL` - The URL of the backend API

### Backend (.env)

- `DATABASE_URL` - SQLite database connection string (default: `sqlite:///./todo.db`)
- `SECRET_KEY` - Secret key for JWT signing
- `ALGORITHM` - Algorithm for JWT (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time

## Testing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Click "Sign Up" to create a new account
3. Log in with your credentials
4. Start adding and managing your tasks!

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.