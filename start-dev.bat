@echo off
echo Starting GearShop...
cd backend
start "Backend" cmd /k "npm run dev"
cd ..\frontend
start "Frontend" cmd /k "npm run dev"
echo Done! Open http://localhost:5001 in your browser.
pause