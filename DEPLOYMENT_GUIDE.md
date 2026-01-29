# Deployment Guide

This guide covers how to deploy the Hospitalia website to various hosting platforms.

## Pre-Deployment Checklist

1. **Check Assets**: Ensure all images and icons are loading correctly.
2. **Minify Code** (Optional): Minify `css/styles.css` and `js/main.js` for better performance.
3. **Meta Tags**: Update title, description, and OG tags in `index.html` for SEO.

## Hosting Options

### 1. GitHub Pages (Recommended for Static Sites)

1. Push your code to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Select the `main` branch as the source.
4. Click **Save**. Your site will be live at `https://yourusername.github.io/repo-name`.

### 2. Netlify

1. Log in to Netlify and click **"Add new site"**.
2. Select **"Import an existing project"**.
3. Connect your GitHub/GitLab/Bitbucket provider.
4. Select your repository.
5. Click **"Deploy site"**. Netlify will automatically detect `index.html`.

### 3. Vercel

1. Install Vercel CLI or go to the dashboard.
2. Import your Git repository.
3. Keep default settings (Root directory: `./`).
4. Click **Deploy**.

## Post-Deployment

- **Test on Mobile**: Verify that the responsive menu works on phone screens.
- **Check External Links**: Ensure all CDN links (Tailwind, GSAP) are accessible.
- **monitor Performance**: Use Google Lighthouse to check page speed and accessibility scores.
