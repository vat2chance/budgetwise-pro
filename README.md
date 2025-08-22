# BudgetWise Pro - Mobile-Optimized Budgeting App

A comprehensive personal and business budgeting application built with Next.js 15, optimized for mobile devices with PWA capabilities.

## 🚀 Features

### Core Functionality
- **Smart Budgeting**: Create and manage budgets across multiple categories
- **Transaction Tracking**: Monitor income and expenses with detailed categorization
- **AI-Powered Insights**: Get personalized financial recommendations
- **Business Tools**: Break-even calculator and business metrics
- **Real-time Sync**: Supabase-powered backend with real-time updates
- **Payment Processing**: Stripe integration for subscription management

### Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes (320px - 4K)
- **Touch-Friendly**: 44px minimum touch targets for better mobile UX
- **PWA Support**: Installable as a mobile app with offline capabilities
- **Mobile Navigation**: Collapsible sidebar with smooth animations
- **Optimized Charts**: Responsive charts that work on small screens
- **Mobile Typography**: Readable text sizes across all devices

### Technical Features
- **Next.js 15**: Latest framework with App Router and Turbopack
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework with mobile-first approach
- **Supabase**: Backend-as-a-Service with PostgreSQL and real-time features
- **Stripe**: Secure payment processing with subscription management
- **Service Worker**: Offline caching and background sync capabilities

## 📱 Mobile Optimizations

### Responsive Design
- Mobile-first CSS approach with `sm:`, `md:`, `lg:` breakpoints
- Flexible grid layouts that adapt to screen size
- Optimized spacing and typography for mobile devices
- Touch-friendly buttons and interactive elements

### PWA Features
- Installable web app with custom icons
- Offline functionality with service worker caching
- Background sync for data updates
- Push notifications support
- App-like navigation experience

### Performance
- Optimized images and assets for mobile networks
- Lazy loading for better mobile performance
- Touch gesture support for mobile interactions
- Smooth animations optimized for mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Charts**: Recharts
- **Icons**: Heroicons
- **Deployment**: Vercel, Netlify, Railway, Docker

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (optional for payments)

### Installation

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
   
   Fill in your Supabase and Stripe credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile Development

### Testing on Mobile
- Use Chrome DevTools Device Toolbar for mobile testing
- Test on actual devices for best results
- Use Lighthouse for PWA and mobile performance audits

### Mobile-Specific Features
- Touch gestures and swipe navigation
- Mobile-optimized forms and inputs
- Responsive charts and data visualization
- Mobile-friendly modals and overlays

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run deploy:vercel
```

### Netlify
```bash
npm run deploy:netlify
```

### Railway
```bash
npm run deploy:railway
```

### Docker
```bash
docker build -t budgetwise-pro .
docker run -p 3000:3000 budgetwise-pro
```

## 📊 Performance

### Mobile Performance Metrics
- **Lighthouse Score**: 90+ on mobile
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Techniques
- Code splitting and lazy loading
- Image optimization and WebP support
- CSS and JavaScript minification
- Service worker caching strategies
- Mobile-first responsive design

## 🔧 Configuration

### Mobile Breakpoints
```css
/* Mobile-first approach */
.mobile-first {
  /* Base mobile styles */
}

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### PWA Configuration
- `manifest.json` for app metadata
- `sw.js` for service worker functionality
- Mobile-optimized icons and splash screens
- Offline caching strategies

## 📱 Mobile Testing Checklist

- [ ] Responsive design on all screen sizes
- [ ] Touch targets are at least 44px
- [ ] Mobile navigation works smoothly
- [ ] Charts are readable on small screens
- [ ] Forms are mobile-friendly
- [ ] PWA installation works
- [ ] Offline functionality works
- [ ] Performance is optimized for mobile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with mobile-first approach
4. Test on multiple devices and screen sizes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔮 Roadmap

- [ ] React Native mobile app
- [ ] Advanced mobile gestures
- [ ] Mobile-specific features
- [ ] Enhanced offline capabilities
- [ ] Mobile push notifications
- [ ] Mobile analytics and tracking

---

**Built with ❤️ for mobile-first budgeting experience**
