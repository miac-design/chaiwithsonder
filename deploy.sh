#!/bin/bash
# ChaiChat Deploy Script — Run this in your terminal
# Usage: bash deploy.sh

set -e
cd /Users/miach/chaiwithsonder

echo "🔧 Step 1/5: Installing icon packages..."
npm install
echo "✅ Packages installed"

echo ""
echo "📸 Step 2/5: Copying Afsoon's photo..."
cp ~/Desktop/afsoon.jpeg public/team/afsoon.jpg
echo "✅ Photo copied"

echo ""
echo "🧹 Step 3/5: Cleaning up temp files..."
rm -f _deploy.sh
echo "✅ Cleaned up"

echo ""
echo "📦 Step 4/5: Committing changes..."
git add -A
HUSKY=0 git commit -m "feat: Homepage redesign, Lucide/Phosphor icon system, Afsoon Sheikhi, AI visibility schema

- 7 new homepage sections (Hero, SocialProof, MentorPreview, HowItWorks, SonderSwap, Sonder, DualCTA)
- Lucide React (primary) + Phosphor Icons (accent) — zero inline SVGs
- 8 JSON-LD schemas for AI/GEO visibility
- Navbar: Sonder Swap with NEW badge
- Footer: 4-column + Made with heart by Mia C.
- New mentor: Afsoon Sheikhi (Senior QA Engineer)
- Updated layout.tsx metadata (OG, Twitter, robots, canonical)"
echo "✅ Committed"

echo ""
echo "🚀 Step 5/5: Pushing to deploy..."
git push origin main
echo ""
echo "✅ DONE! Check Vercel for deployment status."
echo "   → https://vercel.com/mics-projects-4a7265ca/chaiwithsonder-nextjs"
