@echo off
echo Creating desktop shortcut for House Price Prediction...

REM Create a batch file that starts everything
echo @echo off > "House Price Prediction.bat"
echo echo 🏠 Starting House Price Prediction... >> "House Price Prediction.bat"
echo echo ================================================ >> "House Price Prediction.bat"
echo cd /d "%~dp0" >> "House Price Prediction.bat"
echo start "Backend Server" python main.py >> "House Price Prediction.bat"
echo timeout /t 3 /nobreak ^>nul >> "House Price Prediction.bat"
echo start "Frontend" index.html >> "House Price Prediction.bat"
echo echo ✅ Application started! >> "House Price Prediction.bat"
echo echo Backend: http://localhost:8000 >> "House Price Prediction.bat"
echo echo Frontend: Should open in browser >> "House Price Prediction.bat"
echo pause >> "House Price Prediction.bat"

echo ✅ Desktop shortcut created!
echo You can now double-click "House Price Prediction.bat" to start everything
pause
