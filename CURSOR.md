# Cursor Project Rules & Guidelines

Welcome to the Cursor rules and guidelines file for this project! Use this document to define conventions, best practices, and reminders for anyone working on this codebase.

---

## Coding Standards
- Use the `meta` function for all SEO and structured data (JSON-LD) in routes.
- Prefer functional React components and hooks.
- Use TypeScript for all files.
- Keep code modular and DRY (Don't Repeat Yourself).
- Use Tailwind v4.x CSS utility classes for styling; avoid inline styles.
- All images must have descriptive `alt` text.
- Use loader-driven data fetching in routes.
- Use error boundaries for all routes/components.

## SEO
- Always provide unique and descriptive meta titles and descriptions.
- Add Open Graph and Twitter meta tags for social sharing.
- Use canonical URLs for all main pages.
- Add structured data (JSON-LD) for articles, collections, and the homepage.
- Generate and maintain sitemap.xml and robots.txt.

## Accessibility
- Use semantic HTML elements (e.g., `<main>`, `<nav>`, `<article>`, etc.).
- Ensure all interactive elements are keyboard accessible.
- Use ARIA attributes where appropriate.
- Test color contrast for readability.

## Project-Specific Notes
- This app uses React Router v7 in framework mode
- Prioritize static content generation and server-side rendering (SSR) wherever possible.
-  