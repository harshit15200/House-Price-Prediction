@echo off
echo 🏠 Starting House Price Prediction API...
echo ================================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

REM Check if requirements are installed
python -c "import fastapi, uvicorn, pandas, sklearn" >nul 2>&1
if errorlevel 1 (
    echo ❌ Missing dependencies. Installing requirements...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Failed to install requirements
        pause
        exit /b 1
    )
)

echo ✅ All dependencies are installed
echo 🚀 Starting server on http://localhost:8000
echo 📚 API Documentation: http://localhost:8000/docs
echo 🔍 Health Check: http://localhost:8000/health
echo ================================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the FastAPI server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

pause
