#!/bin/bash

echo "Setting up EcoFinds Frontend Environment..."

echo ""
echo "Creating environment file..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "Environment file created successfully!"
else
    echo "Environment file already exists."
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Setup complete! You can now run:"
echo "  npm run dev"
echo ""
