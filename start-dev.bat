@echo off
echo Starting EcoFinds Development Environment...

echo.
echo Starting Django Backend Server...
start "Django Backend" cmd /k "cd backend && python manage.py runserver"

echo.
echo Starting Next.js Frontend Server...
start "Next.js Frontend" cmd /k "cd frontend/ecofinds_frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:8000/admin
echo.
echo Press any key to exit...
pause > nul
