@echo off
echo Starting Neon Todo App locally...
echo =================================

echo.
echo Please make sure you are in the project root directory.
echo This script will start both the backend and frontend servers.
echo.

echo Starting backend server...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload"

timeout /t 5 /nobreak >nul

echo.
echo Starting frontend server...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo The backend should be running on http://localhost:8000
echo The frontend should be running on http://localhost:3000
echo.
echo Opening the application in your default browser...
start http://localhost:3000

echo.
echo Press any key to exit...
pause >nul