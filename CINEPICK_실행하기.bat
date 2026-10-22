@echo off
chcp 65001 >nul
echo ========================================================
echo   CINEPICK 영화 추천 웹사이트를 실행합니다...
echo ========================================================
echo.

start http://localhost:5173/

call npm.cmd run dev -- --port 5173 --host
pause
