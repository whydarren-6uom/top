# Quick Setup Guide

This is a streamlined setup guide for getting the portfolio running quickly.

## Prerequisites

- **Node.js** v20.x or higher ([Download](https://nodejs.org/))
- **npm** v11.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Quick Start (5 minutes)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd <repo-name>
npm install
```

### 2. Setup Environment

```bash
# Copy environment template
cp .env.example .env.local
```

### 3. Create Sanity Project

```bash
# Create a new Sanity project
npx sanity@latest init --project-plan free --dataset production --output-path ./sanity-temp

# Follow the prompts to login/create account
# Copy the Project ID when shown

# Clean up temporary folder
rm -rf sanity-temp
```

### 4. Configure Environment

Edit `.env.local` and add your Sanity Project ID:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-11-09"
```

### 5. Start Development

```bash
npm run dev
```

**URLs:**

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## What to Do Next

1. Visit http://localhost:3000/studio
2. Log in with your Sanity account
3. Start creating content:
   - Profile information
   - Projects
   - Blog posts
   - Job experience

## Optional Configuration

### GitHub Contribution Graph

Add to `.env.local`:

```env
NEXT_PUBLIC_GITHUB_USERNAME="your-username"
NEXT_PUBLIC_GITHUB_JOIN_YEAR="2020"
```

### Analytics (Umami)

1. Create account at [umami.is](https://umami.is)
2. Add website and get Website ID
3. Add to `.env.local`:

```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id"
```

### Comments (Giscus)

1. Enable GitHub Discussions on your repo
2. Configure at [giscus.app](https://giscus.app)
3. Add to `.env.local`:

```env
NEXT_PUBLIC_GISCUS_REPO="username/repo"
NEXT_PUBLIC_GISCUS_REPOID="your-repo-id"
NEXT_PUBLIC_GISCUS_CATEGORYID="your-category-id"
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables from `.env.local`
6. Click "Deploy"

Done! Your site will be live in ~2 minutes.

### Deploy to Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Click "Deploy"

## Troubleshooting

**Port already in use:**

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Clear cache and rebuild:**

```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

**Check installed versions:**

```bash
node --version  # Should be v20.x or higher
npm --version   # Should be v11.x or higher
```

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review [Next.js Documentation](https://nextjs.org/docs)
- Visit [Sanity Documentation](https://www.sanity.io/docs)
- Open an issue on GitHub
