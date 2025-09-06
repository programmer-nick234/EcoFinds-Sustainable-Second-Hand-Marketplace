@echo off
echo Starting EcoFinds Development Environment...

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && python manage.py runserver"

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend/ecofinds_frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul