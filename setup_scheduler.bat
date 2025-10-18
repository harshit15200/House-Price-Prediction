@echo off
echo Setting up Windows Task Scheduler for House Price Prediction...

REM Create a task that starts the server at Windows startup
schtasks /create /tn "House Price Prediction" /tr "python main.py" /sc onstart /ru "SYSTEM" /f

echo ✅ Task created successfully!
echo The server will now start automatically when Windows boots up.
echo 
echo To remove the task later, run:
echo schtasks /delete /tn "House Price Prediction" /f
pause
