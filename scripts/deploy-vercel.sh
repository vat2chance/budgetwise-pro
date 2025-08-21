#!/bin/bash

# 🌐 Vercel Deployment Script for BudgetWise Pro

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Vercel deployment complete!"
echo "🌐 Your app should be live at: https://your-app.vercel.app"
echo "📊 Check status with: vercel ls"
