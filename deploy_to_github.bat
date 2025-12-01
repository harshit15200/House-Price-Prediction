@echo off
echo 🚀 Deploying to GitHub Repository
echo ================================
echo Repository: https://github.com/harshit15200/House-Price-Prediction.git
echo.

echo Step 1: Initializing Git repository...
git init

echo Step 2: Adding all files to Git...
git add .

echo Step 3: Committing files...
git commit -m "Initial commit: House Price Prediction API with ML model"

echo Step 4: Adding remote origin...
git remote add origin https://github.com/harshit15200/House-Price-Prediction.git

echo Step 5: Setting main branch...
git branch -M main

echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Deployment completed!
echo Your project is now live at:
echo https://github.com/harshit15200/House-Price-Prediction
echo.
echo 🎉 Success! Your House Price Prediction project is on GitHub!
pause
