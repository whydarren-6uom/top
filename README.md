<div align="center">
<a href="https://darrenwang.site"><img src="./public/logo.png" width="60px"></a>
</div>

<div align="center">
<h1>darrenwang.site</h1>
<p>Personal portfolio website of Darren Wang - Software Engineer & QA Engineer</p>
</div>

# Tech Stack

- [Next.js 16][nextjs] - React Framework with App Router and Turbopack
- [React 19][react] - UI Library
- [Vercel][vercel] - Hosting and Deployment
- [Sanity.io v4][sanity] - Headless CMS and Content Lake
- [Tailwind CSS v4][tailwind] - Utility-first CSS Framework
- [Umami][umami] - Privacy-focused Analytics
- [Next Themes][nexttheme] - Dark Mode Support
- [React Refractor][reactrefractor] - Syntax Highlighting
- [Framer Motion][framer] - Animation Library

## Version Information

This project uses the latest stable versions (as of November 2025):

- **Next.js**: 16.0.1
- **React**: 19.2.0
- **Tailwind CSS**: 4.1.17
- **Sanity**: 4.14.2
- **TypeScript**: 5.9.3

## Project Overview

Portfolio website featuring personal projects, professional experience, and technical skills. Built with modern web technologies and managed through Sanity CMS.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher) - [Download](https://nodejs.org/)
- **npm** (v11.x or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## Run Project Locally

Follow this guide to get this site running locally:

### 1. Clone Repository

```bash
git clone https://github.com/whydarren-6uom/top.git
cd top
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js, React, and React DOM
- Tailwind CSS v4 with PostCSS plugin
- Sanity CMS and related packages
- TypeScript and type definitions
- Additional UI libraries

### 3. Setup Environment Variables

Rename [`.env.example`][env-example] to `.env.local`:

```bash
cp .env.example .env.local
```

### 4. Create a Sanity Project

The minimal environment variables required to run this project:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Run the following command to create a new Sanity project:

```bash
npx sanity@latest init --project-plan free --dataset production --output-path ./sanity-temp
```

**Follow the prompts:**

1. **Login/Create Account**: Choose your preferred login method (Google, GitHub, or Email)
2. **Project Name**: Enter your project name (e.g., "My Portfolio")
3. The CLI will create a Sanity project and provide you with a **Project ID**

After completion, you can delete the temporary folder:

```bash
rm -rf sanity-temp
```

### 5. Configure Environment Variables

Edit your `.env.local` file with the following:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2023-07-21"

# Optional: Sanity Access Token (not required for public data)
# NEXT_PUBLIC_SANITY_ACCESS_TOKEN=""

# Optional: GitHub Profile (for contribution graph)
NEXT_PUBLIC_GITHUB_USERNAME="your-github-username"
NEXT_PUBLIC_GITHUB_JOIN_YEAR="2020"

# Optional: Analytics
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=""

# Optional: Giscus Comments
# NEXT_PUBLIC_GISCUS_REPO=""
# NEXT_PUBLIC_GISCUS_REPOID=""
# NEXT_PUBLIC_GISCUS_CATEGORYID=""
```

> [!NOTE]
> The access token is optional. The project is configured to work without it. If you need write access or private content, visit [sanity.io/manage][sanity-manage] to create a token.

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at:

- **Local**: [http://localhost:3000][localhost]
- **Sanity Studio**: [http://localhost:3000/studio][localhost-studio]

### 7. Add Content

By default, the UI will be blank. To add content:

1. Visit [http://localhost:3000/studio][localhost-studio]
2. Create your profile, projects, jobs, education, and other content
3. The changes will appear on your site immediately

## Build for Production

```bash
npm run build
```

This will:

1. Run ESLint to check for errors
2. Build an optimized production bundle
3. Generate static pages where possible

## Deployment

### Recommended: Vercel (Free)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

Vercel is made by the creators of Next.js and offers:

- Zero configuration
- Automatic HTTPS
- Global CDN
- Automatic deployments on push
- Free hobby tier

### Alternative: Netlify

1. Push your code to GitHub
2. Connect your repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

### GitHub Pages Note

⚠️ **This project cannot be directly deployed to GitHub Pages** because it requires a Node.js server. GitHub Pages only hosts static files.

**Options for GitHub Pages:**

1. Use Vercel or Netlify instead (recommended)
2. Export as static site (limited functionality):
   ```bash
   # Add to next.config.js:
   output: 'export'
   ```
   Note: This disables Server-Side Rendering, API routes, and dynamic features.

## Project Structure

````
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page
│   ├── projects/                # Projects pages
│   ├── studio/                  # Sanity Studio mount point
│   ├── components/              # React components
│   │   ├── global/             # Global components (Navbar, Footer)
│   │   ├── pages/              # Page-specific components
│   │   └── shared/             # Shared/reusable components
│   └── styles/                  # Global styles and CSS
├── lib/                         # Utility functions
│   ├── sanity.client.ts        # Sanity client configuration
│   ├── sanity.query.ts         # GROQ queries
│   └── env.api.ts              # Environment variables
├── schemas/                     # Sanity schema definitions
│   ├── project.ts              # Project schema
│   ├── profile.ts              # Profile schema
│   ├── job.ts                  # Job/Experience schema
│   └── education.ts            # Education schema
├── sanity.config.ts            # Sanity Studio configuration
├── tailwind.config.js          # Tailwind CSS configuration (legacy)
├── postcss.config.js           # PostCSS configuration
└── next.config.js              # Next.js configuration

### Important Files

| File(s)                                        | Description                                     |
| ---------------------------------------------- | ----------------------------------------------- |
| [`sanity.config.ts`](sanity.config.ts)         | Sanity Studio configuration (v4)                |
| [`postcss.config.js`](postcss.config.js)       | PostCSS config with Tailwind CSS v4 plugin      |
| [`app/styles/globals.css`](app/styles/globals.css) | Global styles with Tailwind v4 @theme config |
| [`lib/sanity.client.ts`](lib/sanity.client.ts) | Sanity client setup                             |
| [`lib/sanity.query.ts`](lib/sanity.query.ts)   | GROQ queries for fetching data                  |
| [`schemas/`](./schemas)                        | Sanity content type definitions                 |
| [`.env.local`](.env.example)                   | Environment variables (create from .env.example)|

## Troubleshooting

### Common Issues

**Node.js not found:**
```bash
# Install Node.js from nodejs.org or via Homebrew (macOS):
brew install node
````

**Port 3000 already in use:**

```bash
# Kill the process using port 3000:
lsof -ti:3000 | xargs kill -9
```

**Build errors after updating:**

```bash
# Clear cache and reinstall:
rm -rf node_modules package-lock.json .next
npm install
```

**Sanity Studio not loading:**

- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that the dataset name matches your Sanity project
- Ensure you're logged in to Sanity CLI: `npx sanity login`

### Known Warnings & Security Notes

**`--localstorage-file` warning:**

```
(node:xxxxx) Warning: `--localstorage-file` was provided without a valid path
```

This warning comes from Sanity Studio and doesn't affect functionality. It's safe to ignore.

**Security vulnerabilities in dev dependencies:**

The project may show 3 moderate vulnerabilities in `prismjs`/`refractor` packages:

- These are DOM Clobbering vulnerabilities (CVE in PrismJS <1.30.0)
- Only affect scenarios with untrusted user input
- **Safe for personal portfolios** where you control all content
- Upgrading to fix would require breaking changes to syntax highlighting
- **No action needed** unless you allow untrusted users to submit code snippets

To check vulnerabilities:

```bash
npm audit                    # All dependencies
npm audit --production       # Production only (should show 0)
```

**Why we use older versions:**

- `react-refractor@2.2.0` and `refractor@3.6.0` for Next.js 16 compatibility
- Version 4+ have breaking API changes requiring significant code refactoring
- Trade-off: Stable functionality vs. minor security issue in controlled environment

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Portfolio Setup Tutorial][sanity-guide]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License & Usage

This portfolio is based on the [victoreke.com][victor-site] template by Victor Eke, which is MIT-licensed. Feel free to use this code as inspiration for your own portfolio.

If you use this template, please provide attribution by linking to the original source:

- **Template by**: [Victor Eke](https://victoreke.com)
- **Customized by**: [Darren Wang](https://darrenwang.site)

---

Built with ❤️ using Next.js 16, React 19, Tailwind CSS v4, and Sanity v4

<!-- Link Refs -->

[nextjs]: https://nextjs.org
[react]: https://react.dev
[vercel]: https://vercel.com
[sanity]: https://sanity.io
[tailwind]: https://tailwindcss.com
[umami]: https://umami.is
[framer]: https://www.framer.com/motion
[nexttheme]: https://github.com/pacocoursey/next-themes
[reactrefractor]: https://github.com/rexxars/react-refractor
[site]: https://darrenwang.site
[victor-site]: https://victoreke.com
[studio]: https://darrenwang.site/studio
[env-example]: .env.example
[localhost]: http://localhost:3000
[localhost-studio]: http://localhost:3000/studio
[env-api]: lib/env.api.ts
[sanity-manage]: https://sanity.io/manage
[sanity-guide]: https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs
