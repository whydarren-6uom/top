# Documentation Index

This project includes comprehensive documentation to help you set up, customize, and deploy your portfolio.

## 📚 Documentation Files

### [README.md](README.md)

**Main documentation** - Comprehensive guide covering everything about the project.

**Includes:**

- Project overview and tech stack
- Complete setup instructions
- Project structure
- Configuration details
- Troubleshooting guide

**Start here if:** You want a complete understanding of the project.

---

### [SETUP.md](SETUP.md)

**Quick start guide** - Get up and running in 5 minutes.

**Includes:**

- Prerequisites checklist
- Step-by-step setup (streamlined)
- Quick deployment to Vercel
- Common troubleshooting

**Start here if:** You want to get started quickly.

---

### [DEPENDENCIES.md](DEPENDENCIES.md)

**Package documentation** - Complete list of all project dependencies.

**Includes:**

- All npm packages with versions
- Package purposes and usage
- Installation commands
- Version compatibility notes
- Security audit instructions

**Start here if:** You want to understand what packages are used and why.

---

### [DEPLOYMENT.md](DEPLOYMENT.md)

**Deployment guide** - Detailed instructions for deploying to various platforms.

**Includes:**

- Vercel deployment (recommended)
- Netlify deployment
- GitHub Pages considerations
- Other platform options
- Environment variables setup
- Post-deployment checklist
- Troubleshooting deployment issues

**Start here if:** You're ready to deploy your portfolio online.

---

### [.github/SECURITY.md](.github/SECURITY.md)

**Security policy** - Information about known vulnerabilities and security best practices.

**Includes:**

- Known security issues and why they're acceptable
- Production security considerations
- Dependency update guidelines
- Security best practices

**Start here if:** You see npm audit warnings or have security concerns.

---

## 🚀 Quick Reference

### First Time Setup

1. **Prerequisites:** Node.js 20+, npm 11+, Git
2. **Clone:** `git clone <repo>`
3. **Install:** `npm install`
4. **Sanity:** `npx sanity@latest init`
5. **Configure:** Edit `.env.local`
6. **Run:** `npm run dev`
7. **Visit:** http://localhost:3000

### Development Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

### Deployment (Vercel - Easiest)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

---

## 📋 Package Versions

As of November 2025:

| Package      | Version |
| ------------ | ------- |
| Next.js      | 16.0.1  |
| React        | 19.2.0  |
| Tailwind CSS | 4.1.17  |
| Sanity       | 4.14.2  |
| TypeScript   | 5.9.3   |

---

## 🆘 Getting Help

1. Check the relevant documentation file above
2. Review [Troubleshooting](README.md#troubleshooting) section
3. Visit [Next.js Docs](https://nextjs.org/docs)
4. Visit [Sanity Docs](https://www.sanity.io/docs)
5. Open an issue on GitHub

---

## 🎯 Common Tasks

### Add Content

→ Visit http://localhost:3000/studio

### Change Styling

→ Edit files in `app/styles/` and `app/components/`

### Add New Page

→ Create new folder in `app/` directory

### Update Dependencies

→ See [DEPENDENCIES.md](DEPENDENCIES.md)

### Deploy Changes

→ Just `git push` (if using Vercel/Netlify)

---

## ⚠️ Important Notes

### GitHub Pages

This project **cannot** be deployed to GitHub Pages directly because it requires a Node.js server. Use Vercel or Netlify instead.

### Environment Variables

Always prefix public variables with `NEXT_PUBLIC_` for them to be available in the browser.

### Sanity Studio

Access your CMS at `/studio` route (e.g., `https://yoursite.com/studio`)

### Node.js Version

Requires Node.js 20.x or higher. Check with: `node --version`

---

## 📖 Tech Stack Documentation

- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Sanity v4](https://www.sanity.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Framer Motion](https://www.framer.com/motion)

---

## 📝 File Structure Overview

```
├── app/                    # Next.js App Router
│   ├── components/        # React components
│   ├── styles/           # CSS styles
│   └── studio/           # Sanity Studio
├── lib/                   # Utility functions
├── schemas/              # Sanity schemas
├── public/               # Static assets
├── .env.local           # Environment variables (create this)
└── Documentation files   # What you're reading now!
```

---

## ✅ Checklist

Before deploying:

- [ ] All dependencies installed
- [ ] Sanity project created
- [ ] Environment variables configured
- [ ] Project runs locally without errors
- [ ] Content added via Sanity Studio
- [ ] Images and links tested
- [ ] Dark mode works
- [ ] Responsive on mobile

---

## 🎨 Customization

To make this portfolio your own:

1. **Update content** in Sanity Studio
2. **Change colors** in `app/styles/globals.css` (in `@theme` block)
3. **Modify layout** in `app/components/`
4. **Add new sections** by creating new components
5. **Update metadata** in `app/layout.tsx`

---

Built with ❤️ using Next.js 16, React 19, Tailwind CSS v4, and Sanity v4
