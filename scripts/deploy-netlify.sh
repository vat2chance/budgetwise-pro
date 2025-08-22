#!/bin/bash

# 🎯 Netlify Deployment Script for BudgetWise Pro

echo "🚀 Starting Netlify deployment..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if logged in
if ! netlify status &> /dev/null; then
    echo "🔐 Please login to Netlify..."
    netlify login
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=.next

echo "✅ Netlify deployment complete!"
echo "🌐 Your app should be live at: https://your-app.netlify.app"
echo "📊 Check status with: netlify status"


