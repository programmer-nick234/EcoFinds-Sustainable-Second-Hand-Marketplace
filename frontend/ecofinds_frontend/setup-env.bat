@echo off
echo Setting up EcoFinds Frontend Environment...

echo.
echo Creating environment file...
if not exist .env.local (
    copy .env.example .env.local
    echo Environment file created successfully!
) else (
    echo Environment file already exists.
)

echo.
echo Installing dependencies...
npm install

echo.
echo Setup complete! You can now run:
echo   npm run dev
echo.
pause
