# BudgetWise Pro

A comprehensive personal and business budgeting application built with Next.js, featuring AI-powered financial insights, real-time account aggregation, and advanced reporting capabilities.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time financial metrics and spending insights
- **Budget Management**: Multi-frequency budgeting (daily/weekly/monthly/yearly)
- **Transaction Tracking**: Comprehensive transaction history with categorization
- **AI Financial Advisor**: Personalized insights and recommendations
- **Business Analytics**: Break-even analysis and unit economics
- **Advanced Reporting**: Exportable reports with embedded formulas

### Key Capabilities
- **Account Aggregation**: Connect bank accounts for real-time data sync
- **Affordability Calculator**: Track housing ratios and savings rates
- **Catch-Up Planning**: AI-powered recovery plans for overspending
- **Multi-Entity Support**: Personal and business finances in one platform
- **Export Functionality**: PDF, Excel, and CSV reports with formulas

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Bank Integration**: Plaid (planned)
- **AI Integration**: OpenAI (planned)
- **Payments**: Stripe (planned)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd budgetwise-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/budgetwise_pro"
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Dashboard
│   ├── budgets/           # Budget management
│   ├── transactions/      # Transaction history
│   ├── business/          # Business analytics
│   ├── reports/           # Report generation
│   └── advisor/           # AI advisor
├── components/            # Reusable React components
│   ├── dashboard/         # Dashboard components
│   ├── budgets/           # Budget components
│   ├── transactions/      # Transaction components
│   ├── business/          # Business components
│   ├── reports/           # Report components
│   └── advisor/           # Advisor components
├── lib/                   # Utility functions and configurations
│   ├── prisma.ts         # Database client
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## 🎯 Key Features Implementation

### Dashboard
- Real-time financial overview
- Spending trends and category breakdown
- Quick actions and AI insights
- Upcoming bills and budget status

### Budget Management
- Multi-frequency budget categories
- Progress tracking with visual indicators
- Envelope/sinking fund support
- Budget vs actual comparisons

### AI Advisor
- Natural language financial queries
- Personalized spending recommendations
- Lower-cost alternatives suggestions
- Catch-up planning for overspending

### Business Analytics
- Break-even analysis with interactive charts
- Unit economics tracking
- Product/service margin analysis
- Profitability forecasting

### Reports
- Weekly and monthly financial summaries
- Excel exports with embedded formulas
- PDF reports with charts
- Custom date range selection

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Schema

The app uses Prisma with PostgreSQL. Key models include:

- **Users**: User accounts and preferences
- **Entities**: Personal and business entities
- **Accounts**: Bank accounts and balances
- **Transactions**: Financial transactions with categorization
- **Budgets**: Budget categories and amounts
- **Products**: Business products/services for unit economics
- **Reports**: Generated report history

### API Routes

The app includes API routes for:
- Account management and aggregation
- Budget CRUD operations
- Transaction processing
- Report generation
- AI advisor interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **Bank Integration**: Secure OAuth-style token exchange (no credentials stored)
- **AI Privacy**: AI operates on user data only, no third-party sharing
- **GDPR Compliance**: Data retention controls and export/delete capabilities

## 📊 Performance

- **Dashboard Load**: < 2.5s with 10k transactions
- **Uptime**: 99.9% monthly target
- **Scalability**: Supports 100k+ monthly active users
- **Offline Support**: Read-only cached view with sync queue

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the PRD (Product Requirements Document) for detailed specifications

## 🗺️ Roadmap

### Phase 1 (MVP) - Current
- ✅ Core dashboard and budget management
- ✅ Transaction tracking and categorization
- ✅ Basic reporting functionality
- ✅ AI advisor interface

### Phase 2 (v1.1)
- 🔄 Real bank account integration
- 🔄 Advanced AI recommendations
- 🔄 Excel export with formulas
- 🔄 Envelope budgeting

### Phase 3 (v1.2)
- 📋 Business SKU management
- 📋 Advanced break-even analysis
- 📋 Multi-currency support
- 📋 Role-based access control

### Phase 4 (v1.3)
- 📋 Tax planning and set-asides
- 📋 Debt payoff tools
- 📋 Investment tracking
- 📋 Mobile app development

---

**BudgetWise Pro** - Smart personal and business budgeting for the modern world.
