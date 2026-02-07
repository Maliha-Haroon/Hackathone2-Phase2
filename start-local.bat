@echo off
echo Starting Neon Todo App locally...
echo =================================

echo.
echo Setting up backend...
echo.

REM Start backend in a new command prompt window
start cmd /k "cd /d C:\Users\binte\OneDrive\Desktop\Hack2\phase2\hackathon-todo-phase2\backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload"

timeout /t 5 /nobreak >nul

echo.
echo Setting up frontend...
echo.

REM Start frontend in a new command prompt window
start cmd /k "cd /d C:\Users\binte\OneDrive\Desktop\Hack2\phase2\hackathon-todo-phase2\frontend && npm install && npm run dev"

echo.
echo The backend should be running on http://localhost:8000
echo The frontend should be running on http://localhost:3000
echo.
echo Opening the application in your default browser...
start http://localhost:3000

echo.
echo Press any key to exit...
pause >nul