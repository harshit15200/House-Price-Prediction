@echo off
echo 🚀 GitHub Deployment Setup
echo ================================

echo Step 1: Initializing Git repository...
git init

echo Step 2: Adding all files to Git...
git add .

echo Step 3: Committing files...
git commit -m "Initial commit: House Price Prediction API"

echo.
echo ✅ Git repository ready!
echo.
echo 📋 Next steps:
echo 1. Go to https://github.com
echo 2. Click "New Repository"
echo 3. Name it: house-price-prediction
echo 4. Make it Public
echo 5. Don't initialize with README
echo 6. Click "Create Repository"
echo.
echo 7. Copy the repository URL from GitHub
echo 8. Run these commands:
echo    git remote add origin YOUR_REPOSITORY_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo 🎉 Your project will be on GitHub!
pause
