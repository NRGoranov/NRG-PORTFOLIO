# NRG Site Gallery - Development Startup Script
Write-Host "🚀 Starting NRG Site Gallery Development Server..." -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start development server
Write-Host "🔥 Starting Next.js development server..." -ForegroundColor Cyan
npm run dev















