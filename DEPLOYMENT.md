# Deployment Guide

This guide covers various deployment options for this Next.js portfolio.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [GitHub Pages (Static Export)](#github-pages-static-export)
- [Other Platforms](#other-platforms)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Vercel (Recommended)

Vercel is the platform created by the makers of Next.js. It offers the best Next.js support with zero configuration.

### Why Vercel?

✅ **Zero configuration** - Automatic detection of Next.js
✅ **Free tier** - Generous free hobby plan
✅ **Global CDN** - Fast worldwide performance
✅ **Automatic HTTPS** - Free SSL certificates
✅ **Git integration** - Auto-deploy on push
✅ **Preview deployments** - Test before production
✅ **Edge Functions** - Server-side rendering at the edge

### Deploy to Vercel

#### Method 1: Using Vercel Dashboard (Easiest)

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Visit [vercel.com](https://vercel.com)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**
   - Authorize Vercel to access your GitHub account
   - Select your repository

5. **Configure project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

6. **Add Environment Variables** (see [Environment Variables](#environment-variables) section)

7. **Click "Deploy"**

Your site will be live in ~2 minutes! 🚀

#### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration

Create `vercel.json` for custom configuration (optional):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity-project-id",
    "NEXT_PUBLIC_SANITY_DATASET": "@sanity-dataset"
  }
}
```

---

## Netlify

Netlify is another excellent platform for deploying Next.js applications.

### Deploy to Netlify

1. **Push your code to GitHub**

2. **Visit [netlify.com](https://netlify.com)**

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to GitHub and select your repository**

5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions` (optional)

6. **Add Environment Variables** (see [Environment Variables](#environment-variables) section)

7. **Click "Deploy site"**

### Netlify Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "11"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NEXT_PUBLIC_SANITY_PROJECT_ID = "your-project-id"
  NEXT_PUBLIC_SANITY_DATASET = "production"
```

---

## GitHub Pages (Static Export)

⚠️ **Important Limitations:**

- No Server-Side Rendering (SSR)
- No API Routes
- No dynamic features
- Only static pages

This is **NOT recommended** for this project as it uses Sanity CMS with dynamic data fetching.

### If You Still Want to Try

1. **Update `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = { output: "export", images: { unoptimized: true } };

module.exports = nextConfig;
```

2. **Build static export:**

```bash
npm run build
```

3. **Deploy to GitHub Pages:**

```bash
# Install gh-pages
npm install -D gh-pages

# Add script to package.json
"deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

4. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

**Note:** This approach will break most CMS functionality and dynamic features.

---

## Other Platforms

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Render

1. Connect GitHub repository
2. Select "Web Service"
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Add environment variables
6. Deploy

### DigitalOcean App Platform

1. Connect GitHub repository
2. Detect Next.js application
3. Configure environment variables
4. Deploy

### Cloudflare Pages

1. Connect GitHub repository
2. Framework preset: Next.js
3. Build command: `npx @cloudflare/next-on-pages@1`
4. Output directory: `.vercel/output/static`
5. Add environment variables
6. Deploy

---

## Environment Variables

### Required Variables

Add these to your deployment platform:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-09
```

### Optional Variables

```env
# Sanity Access Token (for private content)
NEXT_PUBLIC_SANITY_ACCESS_TOKEN=your-token

# GitHub Contribution Graph
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_JOIN_YEAR=2020

# Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id

# Comments (Giscus)
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPOID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORYID=your-category-id
```

### Adding Environment Variables

#### Vercel

1. Project Settings → Environment Variables
2. Add each variable with its value
3. Select environments (Production, Preview, Development)
4. Save

#### Netlify

1. Site Settings → Environment Variables
2. Click "Add a variable"
3. Enter key and value
4. Save

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Check homepage loads correctly
- [ ] Verify Sanity Studio access: `https://yoursite.com/studio`
- [ ] Test navigation between pages
- [ ] Check responsive design on mobile
- [ ] Verify images load correctly
- [ ] Test dark mode toggle

### 2. Configure Custom Domain (Optional)

#### Vercel

1. Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

#### Netlify

1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS (automatic)

### 3. Set Up Continuous Deployment

Both Vercel and Netlify automatically deploy on git push:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Your site will automatically redeploy
```

### 4. Configure Sanity CORS

Allow your deployed domain in Sanity:

1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. API → CORS Origins
4. Add your deployment URL: `https://yoursite.com`
5. Allow credentials: Yes

### 5. Set Up Analytics (Optional)

If using Umami:

1. Create account at [umami.is](https://umami.is)
2. Add your website
3. Copy Website ID
4. Add to environment variables
5. Redeploy

### 6. Monitor Performance

- Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance audits
- Check [PageSpeed Insights](https://pagespeed.web.dev/)
- Monitor via Vercel/Netlify analytics dashboard

---

## Troubleshooting

### Build Fails

```bash
# Check build locally first
npm run build

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure all `NEXT_PUBLIC_*` variables are prefixed correctly
- Redeploy after adding/changing environment variables
- Check for typos in variable names

### Sanity Studio Not Loading

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check CORS settings in Sanity dashboard
- Ensure dataset name matches

### Images Not Loading

- Check image domains in `next.config.js`
- Verify Sanity CDN URLs are allowed
- For static export, use `unoptimized: true`

### 404 Errors

- Ensure all dynamic routes are properly defined
- Check file naming conventions in `app/` directory
- Verify deployment output directory

---

## Cost Comparison

| Platform         | Free Tier                   | Best For            |
| ---------------- | --------------------------- | ------------------- |
| **Vercel**       | ✅ Unlimited (with limits)  | Next.js projects    |
| **Netlify**      | ✅ 100GB bandwidth/month    | Static sites, SPAs  |
| **GitHub Pages** | ✅ Unlimited (public repos) | Static sites only   |
| **Railway**      | 💰 $5 credit/month          | Full-stack apps     |
| **Render**       | ✅ 750 hours/month          | Web services        |
| **DigitalOcean** | 💰 Starting $5/month        | More control needed |

---

## Recommended Choice

For this Next.js + Sanity portfolio: **Use Vercel**

**Reasons:**

1. Zero configuration needed
2. Excellent Next.js support
3. Automatic deployments
4. Free tier is generous
5. Best performance
6. Built-in analytics
7. Preview deployments

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
