# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it by creating an issue or contacting the repository owner directly.

## Known Issues

### Development Dependencies

This project currently has **3 moderate severity vulnerabilities** in development dependencies:

**Package:** `prismjs` <1.30.0  
**Vulnerability:** DOM Clobbering (GHSA-x7hr-w5r2-h6wg)  
**Affected Chain:** `prismjs` → `refractor@3.6.0` → `react-refractor@2.2.0`  
**Severity:** Moderate  
**Status:** Accepted Risk

### Why This Is Acceptable

1. **Zero Production Vulnerabilities**

   ```bash
   npm audit --production  # Shows: found 0 vulnerabilities
   ```

2. **Controlled Environment**
   - This is a personal portfolio site
   - All code content is author-controlled
   - No user-generated code snippets
   - No untrusted input

3. **Technical Constraint**
   - Fixing requires upgrading to `refractor@5.0.0` and `react-refractor@4.0.0`
   - These versions have breaking API changes
   - Significant code refactoring would be needed
   - Trade-off: Stable functionality vs. minor dev dependency issue

### When to Address

Consider upgrading if:

- [ ] Allowing untrusted users to submit code snippets
- [ ] Building a platform with user-generated code content
- [ ] Regulatory compliance requires zero vulnerabilities
- [ ] Critical severity vulnerabilities are discovered

### Mitigation

The vulnerability is a DOM Clobbering attack that requires:

1. Untrusted user input
2. Specific HTML/JavaScript injection patterns
3. Client-side code execution

**Current Mitigation:**

- All code content is author-controlled
- No user input accepted for code blocks
- Sanity CMS provides content validation
- Content Security Policy can be added if needed

## Production Security

### Environment Variables

Sensitive data is stored in environment variables:

- ✅ Never commit `.env.local` to git
- ✅ Use Vercel/Netlify environment variable UI
- ✅ Rotate Sanity tokens if compromised
- ✅ Keep `NEXT_PUBLIC_SANITY_ACCESS_TOKEN` optional

### Best Practices

- Keep Next.js and React updated
- Monitor for security advisories
- Use HTTPS in production
- Enable security headers in `next.config.js`
- Regular dependency audits

### Security Headers (Optional)

Add to `next.config.js` for enhanced security:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
```

## Dependency Updates

### Safe to Update

These can be updated without issues:

- Next.js (follow migration guides)
- React (test thoroughly)
- Tailwind CSS (check v4 changes)
- Sanity (follow upgrade docs)
- Framer Motion
- Next Themes

### Update with Caution

These require testing:

- `react-refractor` and `refractor` (breaking changes in v4/v5)
- `@portabletext/react` (API changes)
- Major version bumps

### Update Command

```bash
# Check outdated packages
npm outdated

# Update non-breaking
npm update

# Update to latest (may break)
npm install <package>@latest
```

## Contact

For security concerns, please:

1. Open a GitHub issue
2. Tag as "security"
3. Provide details (but not exploit code publicly)

---

Last Updated: November 9, 2025
