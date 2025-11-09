# Project Dependencies

This document lists all dependencies used in this project with their versions and purposes.

## Runtime Environment

- **Node.js**: v20.x or higher
- **npm**: v11.x or higher

## Core Framework & Libraries

### Production Dependencies

| Package            | Version | Purpose                                       |
| ------------------ | ------- | --------------------------------------------- |
| `next`             | ^16.0.1 | React framework with App Router and Turbopack |
| `react`            | ^19.2.0 | UI library for building components            |
| `react-dom`        | ^19.2.0 | React DOM rendering                           |
| `@types/react-dom` | 19.2.2  | TypeScript types for React DOM                |

### Styling

| Package                | Version  | Purpose                           |
| ---------------------- | -------- | --------------------------------- |
| `tailwindcss`          | ^4.1.17  | Utility-first CSS framework       |
| `@tailwindcss/postcss` | ^4.1.17  | Tailwind CSS v4 PostCSS plugin    |
| `postcss`              | ^8.5.6   | CSS transformations               |
| `autoprefixer`         | ^10.4.21 | Add vendor prefixes automatically |
| `styled-components`    | ^6.1.19  | CSS-in-JS library                 |

### Content Management (Sanity CMS)

| Package              | Version | Purpose                              |
| -------------------- | ------- | ------------------------------------ |
| `sanity`             | ^4.14.2 | Sanity Studio and core functionality |
| `next-sanity`        | ^11.6.5 | Sanity integration for Next.js       |
| `@sanity/vision`     | ^4.14.2 | Query testing tool for Sanity        |
| `@sanity/image-url`  | ^1.2.0  | Image URL builder for Sanity         |
| `@sanity/code-input` | ^6.0.3  | Code block input for Sanity Studio   |
| `@sanity/table`      | ^2.0.0  | Table input for Sanity Studio        |

### UI Components & Interactions

| Package         | Version   | Purpose                             |
| --------------- | --------- | ----------------------------------- |
| `framer-motion` | ^12.23.24 | Animation library for React         |
| `react-icons`   | ^5.5.0    | Icon library with various icon sets |
| `next-themes`   | ^0.4.6    | Dark mode / theme switching         |

### Code Rendering & Syntax Highlighting

| Package               | Version | Purpose                                                      |
| --------------------- | ------- | ------------------------------------------------------------ |
| `react-refractor`     | ^2.2.0  | Syntax highlighting component (compatible with Next.js 16)   |
| `refractor`           | 3.6.0   | Syntax highlighter core (compatible with react-refractor v2) |
| `@portabletext/react` | ^5.0.0  | Render Portable Text content                                 |
| `@types/refractor`    | ^3.0.2  | TypeScript types for Refractor                               |

> **Note:** We use `react-refractor` v2 and `refractor` v3 for compatibility with Next.js 16. Version 4 of these packages have breaking changes that require different import syntax.

### Comments & Social

| Package                 | Version | Purpose                           |
| ----------------------- | ------- | --------------------------------- |
| `@giscus/react`         | ^3.1.0  | GitHub Discussions-based comments |
| `react-github-calendar` | ^4.5.11 | GitHub contribution graph display |

### Image Processing

| Package | Version | Purpose                           |
| ------- | ------- | --------------------------------- |
| `sharp` | ^0.34.5 | High-performance image processing |

### Analytics

| Package             | Version | Purpose                    |
| ------------------- | ------- | -------------------------- |
| `@vercel/analytics` | ^1.5.0  | Privacy-friendly analytics |

## Development Dependencies

| Package              | Version  | Purpose                          |
| -------------------- | -------- | -------------------------------- |
| `typescript`         | ^5.9.3   | TypeScript compiler              |
| `@types/node`        | ^24.10.0 | Node.js type definitions         |
| `@types/react`       | 19.2.2   | React type definitions           |
| `eslint`             | ^9.39.1  | JavaScript/TypeScript linter     |
| `eslint-config-next` | ^16.0.1  | ESLint configuration for Next.js |

## Package Scripts

Available npm scripts defined in `package.json`:

```json
{
  "dev": "next dev", // Start development server with hot reload
  "build": "next lint && next build", // Lint and build for production
  "start": "next start" // Start production server
}
```

## Installation

### Install All Dependencies

```bash
npm install
```

### Install Production Dependencies Only

```bash
npm install --production
```

### Update All Dependencies

```bash
# Check for outdated packages
npm outdated

# Update to latest versions (use with caution)
npm update

# Or update specific package
npm install <package-name>@latest
```

## Version Notes

### Major Version Upgrades

This project uses the latest stable versions as of November 2025:

- **Next.js 16**: Includes Turbopack (faster builds), improved App Router
- **React 19**: New React Compiler, improved concurrent rendering
- **Tailwind CSS v4**: CSS-first configuration with `@theme`, new PostCSS plugin
- **Sanity v4**: Updated Studio, improved TypeScript support

### Breaking Changes from Previous Versions

#### Tailwind CSS v4

- `tailwind.config.js` → CSS `@theme` configuration
- New `@tailwindcss/postcss` plugin required
- `@import "tailwindcss"` instead of `@tailwind` directives

#### Sanity v4

- `deskTool()` → `structureTool()` in config
- Updated TypeScript types
- Enhanced GROQ query types

#### Next.js 16

- Improved Turbopack integration
- Enhanced App Router features
- Better performance optimizations

## Compatibility

### Browser Support

Modern browsers with ES6+ support:

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

### Node.js Version Requirements

- **Minimum**: Node.js 20.x
- **Recommended**: Node.js 20.10.0 or higher

## Security

### Audit Dependencies

```bash
# Check for vulnerabilities
npm audit

# Check production dependencies only
npm audit --production

# Fix automatically (if possible)
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force
```

### Known Security Considerations

**PrismJS Vulnerabilities (Moderate):**

The project currently has 3 moderate vulnerabilities in the syntax highlighting stack:

- Package: `prismjs` <1.30.0
- Issue: DOM Clobbering vulnerability
- Affected: `refractor` → `react-refractor`
- Severity: Moderate

**Why not fixed:**

1. Requires upgrading to `refractor@5.0.0` and `react-refractor@4.0.0`
2. Version 4+ have breaking API changes (different import syntax)
3. Would require significant code refactoring
4. Risk is minimal for portfolio sites with controlled content

**Is it safe?**

- ✅ **YES for personal portfolios** - You control all code content
- ✅ **YES for production** - 0 vulnerabilities in production dependencies
- ⚠️ **Consider upgrading IF** you allow untrusted users to submit code snippets
- ⚠️ **Consider upgrading IF** building a platform with user-generated code

**To check:**

```bash
npm audit --production  # Should show: "found 0 vulnerabilities"
```

### Keep Dependencies Updated

- Review and update dependencies monthly
- Check for security advisories
- Test thoroughly after updates
- Use `package-lock.json` for consistent installs

## License Information

All dependencies are open-source with compatible licenses (MIT, Apache 2.0, etc.). Check individual package licenses for details:

```bash
# List all licenses
npx license-checker --summary
```

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Next.js Dependencies](https://nextjs.org/docs/getting-started/installation)
- [Sanity Packages](https://www.sanity.io/docs/dependencies)
- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
