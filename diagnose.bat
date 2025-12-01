@echo off
echo Starting diagnosis... > diagnosis.txt
python --version >> diagnosis.txt 2>&1
if errorlevel 1 echo Python not found >> diagnosis.txt

echo. >> diagnosis.txt
echo PATH: >> diagnosis.txt
echo %PATH% >> diagnosis.txt

echo. >> diagnosis.txt
echo DIR: >> diagnosis.txt
dir >> diagnosis.txt
