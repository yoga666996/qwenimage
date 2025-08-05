@echo off
echo.
echo ===============================================
echo    🚀 Qwen-Image Website Deployment Script
echo ===============================================
echo.

echo 📁 Checking file structure...
if not exist "index.html" (
    echo ❌ Error: index.html not found!
    pause
    exit /b 1
)

if not exist "styles.css" (
    echo ❌ Error: styles.css not found!
    pause
    exit /b 1
)

if not exist "script.js" (
    echo ❌ Error: script.js not found!
    pause
    exit /b 1
)

if not exist "images\" (
    echo ❌ Error: images folder not found!
    pause
    exit /b 1
)

echo ✅ All core files found!
echo.

echo 📊 File Statistics:
for %%f in (index.html styles.css script.js README.md) do (
    if exist "%%f" (
        for %%s in ("%%f") do echo    %%f: %%~zs bytes
    )
)

echo.
echo 🖼️  Image Files:
for %%f in (images\*) do (
    for %%s in ("%%f") do echo    %%~nxf: %%~zs bytes
)

echo.
echo 🌐 Starting local server...
echo    📍 URL: http://localhost:8000
echo    🛑 Press Ctrl+C to stop the server
echo.

python -m http.server 8000 2>nul || (
    echo ❌ Python not found! Trying alternative methods...
    
    where node >nul 2>nul && (
        echo 📦 Using Node.js serve...
        npx serve . -p 8000
    ) || (
        echo ❌ No suitable server found!
        echo 💡 Please install Python or Node.js to run a local server
        echo 🔗 Or simply open index.html in your browser
        pause
    )
)

pause