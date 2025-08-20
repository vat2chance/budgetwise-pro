# Frontend-Backend Integration Setup Guide

This guide will help you connect the BudgetWise Pro frontend to the newly built backend API.

## Prerequisites

1. **Backend is running** on `http://localhost:5000`
2. **Frontend is running** on `http://localhost:3000`
3. **Stripe account** with API keys configured

## Step 1: Environment Configuration

### Frontend Environment Variables

Create a `.env.local` file in the `budgetwise-pro` directory:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Replace `pk_test_your_stripe_publishable_key_here` with your actual Stripe publishable key.

### Backend Environment Variables

Create a `.env` file in the `backend` directory (see `backend/env.example` for reference):

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/budgetwise_pro"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App URL
APP_URL=http://localhost:3000
```

## Step 2: Start the Backend

### Option A: Using Docker (Recommended)

```bash
cd backend
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Backend API on port 5000
- Prisma Studio on port 5555

### Option B: Manual Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Step 3: Start the Frontend

```bash
cd budgetwise-pro
npm run dev
```

## Step 4: Test the Integration

### 1. Test Authentication

1. Navigate to `http://localhost:3000/auth`
2. Try to sign up with a new account
3. Check the browser console for any API errors
4. Verify the user is created in the database

### 2. Test Login

1. Use the credentials from signup to log in
2. Verify the JWT token is stored in localStorage
3. Check that you're redirected to the dashboard

### 3. Test Stripe Integration

1. Go to subscription plans
2. Select a paid plan
3. Verify the checkout session is created
4. Check Stripe dashboard for the session

## Step 5: Stripe Configuration

### 1. Create Products in Stripe Dashboard

Create products that match your subscription plans:

- **Basic Plan**: $9.99/month
- **Pro Plan**: $19.99/month
- **Enterprise Plan**: $49.99/month

### 2. Configure Webhooks

Set up webhook endpoints in Stripe Dashboard:

```
URL: http://localhost:5000/api/webhooks/stripe
Events: 
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

### 3. Update Backend Environment

Ensure your backend has the correct Stripe webhook secret.

## Troubleshooting

### Common Issues

#### 1. CORS Errors

If you see CORS errors in the browser console:

- Ensure the backend is running on port 5000
- Check that CORS is properly configured in `backend/src/server.js`
- Verify the frontend is making requests to the correct URL

#### 2. Authentication Errors

If authentication fails:

- Check that JWT_SECRET is set in backend `.env`
- Verify the database is running and accessible
- Check backend logs for any errors

#### 3. Stripe Errors

If Stripe integration fails:

- Verify your Stripe keys are correct
- Check that products exist in your Stripe dashboard
- Ensure webhook endpoints are properly configured

#### 4. Database Connection Issues

If database connection fails:

- Verify PostgreSQL is running
- Check DATABASE_URL in backend `.env`
- Ensure the database exists and is accessible

### Debug Steps

1. **Check Backend Logs**
   ```bash
   cd backend
   docker-compose logs api
   ```

2. **Check Frontend Console**
   - Open browser developer tools
   - Look for errors in Console and Network tabs

3. **Verify API Endpoints**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **Check Database**
   ```bash
   cd backend
   npx prisma studio
   ```

## API Endpoints

The frontend now communicates with these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Subscriptions
- `POST /api/subscriptions/create-checkout-session` - Create Stripe checkout
- `POST /api/subscriptions/create-portal-session` - Access customer portal
- `GET /api/subscriptions/current` - Get current subscription

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Security Features

1. **JWT Authentication**: All protected routes require valid JWT tokens
2. **CORS Protection**: Configured to allow only frontend domain
3. **Rate Limiting**: API requests are rate-limited to prevent abuse
4. **Input Validation**: All inputs are validated using express-validator
5. **Secure Headers**: Helmet.js provides security headers

## Next Steps

1. **Test all CRUD operations** for budgets and transactions
2. **Implement real-time updates** using WebSockets
3. **Add file upload functionality** for receipts
4. **Implement advanced analytics** and reporting
5. **Add email notifications** for important events
6. **Set up monitoring and logging** for production

## Production Deployment

When deploying to production:

1. **Update environment variables** with production values
2. **Use HTTPS** for all communications
3. **Set up proper CORS** for your production domain
4. **Configure production database** (e.g., AWS RDS, Google Cloud SQL)
5. **Set up monitoring** (e.g., Sentry, LogRocket)
6. **Configure CDN** for static assets
7. **Set up CI/CD pipeline** for automated deployments

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend logs for error details
3. Verify all environment variables are set correctly
4. Ensure all services are running and accessible
5. Check the browser console for frontend errors

The integration is now complete! Your frontend should be able to authenticate users, manage subscriptions through Stripe, and perform all CRUD operations through the backend API.
