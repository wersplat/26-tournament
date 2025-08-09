# Production Deployment Guide

This guide covers how to deploy the 26-tournament application to production.

## Prerequisites

- Node.js 18+ and npm 8+
- Docker (optional, for containerized deployment)
- Environment variables configured

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_GRAPHQL_URL=https://graphql.bodegacatsgc.gg/graphql

# Production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment Options

### 1. Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required environment variables

3. **Custom Domain** (Optional)
   - Go to Vercel Dashboard → Domains
   - Add your custom domain

### 2. Railway

1. **Deploy via Railway Dashboard**
   - Connect your GitHub repository
   - Railway will automatically detect Next.js
   - Add environment variables in Railway dashboard

2. **Deploy via CLI**

   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and deploy
   railway login
   railway up
   ```

### 3. Docker Deployment

1. **Build and Run**

   ```bash
   # Build image
   npm run docker:build
   
   # Run container
   npm run docker:run
   ```

2. **Docker Compose**

   ```bash
   # Start with nginx reverse proxy
   npm run docker:compose
   
   # Stop
   npm run docker:compose:down
   ```

### 4. Self-Hosted Server

1. **Build Application**

   ```bash
   npm install
   npm run build
   ```

2. **Start Production Server**

   ```bash
   npm start
   ```

3. **Process Manager (PM2)**

   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start with PM2
   pm2 start npm --name "26-tournament" -- start
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

## Production Checklist

### ✅ Pre-Deployment

- [ ] All environment variables configured
- [ ] Supabase project set up with proper RLS policies
- [ ] GraphQL endpoint accessible
- [ ] SSL certificate configured (if self-hosting)
- [ ] Domain DNS configured
- [ ] Database migrations applied

### ✅ Post-Deployment

- [ ] Health check endpoint responding (`/api/health`)
- [ ] Authentication working
- [ ] Admin dashboard accessible
- [ ] GraphQL queries working
- [ ] Static assets loading
- [ ] Error monitoring configured (Sentry, etc.)

### ✅ Monitoring & Maintenance

- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

## Security Considerations

### Environment Variables

- Never commit `.env.local` to version control
- Use different Supabase projects for staging/production
- Rotate API keys regularly

### Authentication

- Configure proper Supabase RLS policies
- Set up proper OAuth redirect URLs
- Enable MFA for admin accounts

### API Security

- Rate limiting configured (nginx)
- CORS properly configured
- Input validation on all forms

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Clean build cache
npm run clean
```

### Caching Strategy

- Static assets cached for 1 year
- API responses cached appropriately
- CDN configured for global distribution

### Database Optimization

- Indexes on frequently queried columns
- Connection pooling configured
- Query optimization

## Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clean and rebuild
   npm run clean
   npm install
   npm run build
   ```

2. **Environment Variables**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure variables are accessible in production

3. **Authentication Issues**
   - Verify Supabase URL and keys
   - Check OAuth redirect URLs
   - Ensure RLS policies are correct

4. **GraphQL Connection**
   - Verify GraphQL endpoint URL
   - Check network connectivity
   - Ensure authentication tokens are valid

### Health Check

Monitor the health endpoint:

```bash
curl https://your-domain.com/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

## Support

For deployment issues:

1. Check the application logs
2. Verify environment variables
3. Test locally with production environment
4. Check Supabase and GraphQL service status
