@echo off
cd /d "%~dp0"
start "Paradise View Preview Server" /min cmd /c "node preview-server.js"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173/"
