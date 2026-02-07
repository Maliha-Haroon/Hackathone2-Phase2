@echo off
echo Welcome to Neon Todo App Deployment Helper
echo ==========================================

echo.
echo Available deployment options:
echo 1. Deploy to Render
echo 2. Deploy to Railway  
echo 3. Deploy to Fly.io
echo 4. Deploy to Heroku
echo 5. View deployment instructions
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
  echo.
  echo To deploy to Render:
  echo 1. Go to https://render.com
  echo 2. Create a free account
  echo 3. Create a new Web Service
  echo 4. Connect your GitHub repository
  echo 5. Use these settings:
  echo    - Environment: Python
  echo    - Build Command: pip install -r requirements.txt
  echo    - Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
  echo 6. Add environment variables: DATABASE_URL and SECRET_KEY
  pause
)

if "%choice%"=="2" (
  echo.
  echo To deploy to Railway:
  echo 1. Go to https://railway.app
  echo 2. Create a free account
  echo 3. Create a new project and connect your GitHub repository
  echo 4. Select the backend directory
  echo 5. Railway will use the railway.toml configuration
  echo 6. Add environment variables: DATABASE_URL and SECRET_KEY
  pause
)

if "%choice%"=="3" (
  echo.
  echo To deploy to Fly.io:
  echo 1. Install Fly CLI: curl -L https://fly.io/install.sh ^| sh
  echo 2. Login: fly auth login
  echo 3. Create app: fly launch --config backend/fly.toml
  echo 4. Deploy: fly deploy
  echo 5. Add secrets: fly secrets set DATABASE_URL="..." SECRET_KEY="..."
  pause
)

if "%choice%"=="4" (
  echo.
  echo To deploy to Heroku:
  echo 1. Install Heroku CLI
  echo 2. Login: heroku login
  echo 3. Create app: heroku create your-app-name
  echo 4. Set buildpack: heroku buildpacks:set heroku/python
  echo 5. Add config vars: heroku config:set DATABASE_URL="..." SECRET_KEY="..."
  echo 6. Deploy: git push heroku main
  pause
)

if "%choice%"=="5" (
  echo.
  echo For complete instructions, see the README.md file in the project root.
  echo The README contains detailed instructions for all deployment options.
  pause
)

echo.
echo Thank you for using Neon Todo App!