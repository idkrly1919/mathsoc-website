# Deployment Guide for Cloudflare Pages

This guide explains how to deploy the UNSW MathSoc website to Cloudflare Pages.

## Prerequisites

- A Cloudflare account
- Access to the GitHub repository
- Node.js and npm installed locally (for testing)

## Build Configuration

The project is configured for static export in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
    // ... other image settings
  },
};
```

## Building the Static Site

To build the static site locally:

```bash
npm install
npm run build
```

This will generate static HTML files in the `out/` directory, including the main `index.html` file.

## Cloudflare Pages Setup

### Option 1: Automatic Deployment via Git Integration

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your repository: `idkrly1919/mathsoc-website` (or your forked repository)
6. Configure build settings:
   - **Production branch**: `main` (or your preferred branch)
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
7. Click **Save and Deploy**

### Option 2: Manual Deployment via Wrangler CLI

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Log in to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy to Pages:
   ```bash
   wrangler pages deploy out --project-name=mathsoc-website
   # Or use your custom project name: --project-name=your-project-name
   ```

## Environment Variables

If you need environment variables (e.g., for the Facebook API token):

1. Go to your Cloudflare Pages project settings
2. Navigate to **Settings** > **Environment variables**
3. Add your variables:
   - `NEXT_PUBLIC_FB_API_TOKEN`: Your Facebook API token

## Important Notes

### API Routes

The project includes an API route at `/api/contact` which **will not work** with static export. To make the contact form functional on Cloudflare Pages, you have two options:

1. **Migrate to Cloudflare Functions**:
   - Create a `functions/api/contact.js` file in your project
   - Implement the contact form handler using Cloudflare's serverless functions
   - See [Cloudflare Pages Functions documentation](https://developers.cloudflare.com/pages/functions/)

2. **Use a third-party service**:
   - Integrate with services like Formspree, Netlify Forms, or similar
   - Update the contact form to submit to the third-party service

### Testing Locally

To test the static site locally:

```bash
# Build the site
npm run build

# Serve the out directory
cd out
python3 -m http.server 8000
# Or use npx serve
npx serve

# Open http://localhost:8000 in your browser
```

## Verifying Deployment

After deployment:

1. Check that your site is accessible at `https://your-project.pages.dev`
2. Verify the homepage loads correctly
3. Test navigation to all pages:
   - `/` - Homepage
   - `/about-us` - About Us
   - `/events` - Events
   - `/sponsors` - Sponsors
   - `/resources` - Resources
   - `/contact-us` - Contact Us (note: form submission won't work without additional setup)

## Custom Domain

To add a custom domain:

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain
5. Update DNS settings as required

## Troubleshooting

### "No web page found" error

- Ensure the build output directory is set to `out`
- Verify that `index.html` exists in the `out` directory after building
- Check Cloudflare Pages build logs for errors

### Images not loading

- All images should be in the `public/` directory
- The `images.unoptimized: true` setting is required for static export
- Check that image paths are correct (should start with `/`)

### Build failures

- Check that all dependencies are listed in `package.json`
- Verify Node.js version compatibility (recommend v18 or higher)
- Review Cloudflare Pages build logs for specific errors

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
