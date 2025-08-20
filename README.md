# BudgetWise Pro

A comprehensive financial management application built with Next.js, featuring user authentication, subscription management, budget tracking, and Stripe payment integration.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/signup with JWT tokens
- **Subscription Management**: Multiple subscription tiers with Stripe integration
- **Budget Tracking**: Create, edit, and manage budgets with real-time updates
- **Transaction Management**: Track income and expenses
- **Business Tools**: Product/service management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Subscription Plans
- **Free Plan**: Basic budgeting features
- **Basic Plan**: $9.99/month - Enhanced features and analytics
- **Pro Plan**: $19.99/month - Advanced reporting and AI insights
- **Enterprise Plan**: $49.99/month - Full feature set with priority support

### Technical Features
- **Full-Stack Application**: Next.js frontend + Node.js/Express backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with secure middleware
- **Payment Processing**: Stripe integration for subscriptions
- **Real-time Updates**: WebSocket support for live data
- **API Security**: Rate limiting, CORS, and input validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma** - Type-safe database ORM
- **JWT** - JSON Web Token authentication
- **Stripe** - Payment processing
- **Redis** - Caching and sessions
- **Docker** - Containerization

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- Redis 6+
- Stripe account
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd budgetwise-pro
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp env.local.example .env.local

# Update environment variables
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### 3. Backend Setup

```bash
cd backend

# Using Docker (Recommended)
docker-compose up -d

# OR Manual Setup
npm install
cp env.example .env
# Edit .env with your configuration
npx prisma generate
npx prisma db push
npm run dev
```

### 4. Environment Configuration

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Backend (.env)
```bash
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/budgetwise_pro"
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🔧 Development

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Backend Commands

```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run test         # Run tests
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
```

### Database Management

```bash
# Generate migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Seed database
npm run seed
```

## 📱 Usage

### Authentication Flow

1. **Sign Up**: Create a new account with email and password
2. **Choose Plan**: Select from available subscription tiers
3. **Payment**: Complete payment through Stripe checkout
4. **Access**: Gain access to features based on your plan

### Budget Management

1. **Create Budget**: Set spending limits for different categories
2. **Track Expenses**: Log transactions and categorize spending
3. **Monitor Progress**: View real-time budget status and analytics
4. **Adjust**: Modify budgets as needed throughout the month

### Subscription Management

- **Upgrade/Downgrade**: Change plans through Stripe customer portal
- **Billing**: View invoice history and manage payment methods
- **Cancellation**: Cancel subscription with immediate or end-of-period options

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: API request throttling to prevent abuse
- **CORS Protection**: Configured for secure cross-origin requests
- **Secure Headers**: Helmet.js for security headers
- **SQL Injection Protection**: Prisma ORM prevents SQL attacks

## 🧪 Testing

### Frontend Testing

```bash
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Backend Testing

```bash
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
npm run test:integration # Run integration tests
```

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any static hosting service**

### Backend Deployment

The backend can be deployed to:
- **Railway**
- **Render**
- **Heroku**
- **AWS EC2**
- **Google Cloud Run**

### Environment Variables

Ensure all environment variables are set in your production environment:
- Database connection strings
- JWT secrets
- Stripe API keys
- CORS origins
- Rate limiting settings

## 📊 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Subscription Endpoints

- `POST /api/subscriptions/create-checkout-session` - Create Stripe checkout
- `POST /api/subscriptions/create-portal-session` - Access customer portal
- `GET /api/subscriptions/current` - Get current subscription

### Budget Endpoints

- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Transaction Endpoints

- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](FRONTEND_BACKEND_SETUP.md)
2. Review the [backend setup guide](backend/setup-guide.md)
3. Check GitHub issues for similar problems
4. Create a new issue with detailed information

## 🔮 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] AI-powered financial insights
- [ ] Multi-currency support
- [ ] Tax reporting features
- [ ] Investment tracking
- [ ] Goal setting and tracking

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Stripe](https://stripe.com/) for payment processing
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Heroicons](https://heroicons.com/) for the beautiful icons

---

**BudgetWise Pro** - Take control of your finances with confidence! 💰✨
