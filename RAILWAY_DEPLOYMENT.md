# 🚀 Railway Deployment Guide for BudgetWise Pro

## 🎯 **Quick Deploy (Recommended)**

### **Option 1: Railway Dashboard (Easiest)**

1. **Visit Railway**: https://railway.app/dashboard
2. **Sign In/Up**: Use GitHub, Google, or email
3. **New Project**: Click "New Project"
4. **Deploy from GitHub**: Select "Deploy from GitHub repo"
5. **Choose Repository**: Select your BudgetWise Pro repo
6. **Configure Build**:
   - **Root Directory**: `budgetwise-pro`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
7. **Deploy**: Click "Deploy Now"

### **Option 2: Railway CLI (Advanced)**

If you prefer command line:

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login (this opens browser)
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up
```

## 🔧 **Environment Variables Setup**

After deployment, set these in Railway Dashboard:

### **Required Variables**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://gtfjdpgllylyldmvfpel.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe (Production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URLs
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
NEXT_PUBLIC_API_URL=https://your-app.railway.app

# Security
JWT_SECRET=your-super-secure-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.railway.app
```

### **How to Set Variables**
1. Go to your Railway project
2. Click "Variables" tab
3. Add each variable one by one
4. Click "Add" after each

## 📁 **Project Structure for Railway**

```
budgetwise-pro/
├── railway.json          ← Railway config
├── package.json          ← Dependencies
├── next.config.ts        ← Next.js config
├── src/                  ← Source code
├── public/               ← Static assets
└── .env.local           ← Local env (not deployed)
```

## 🚀 **Deployment Steps**

### **1. Prepare Repository**
- ✅ All code is committed to GitHub
- ✅ `railway.json` is in root of budgetwise-pro folder
- ✅ `package.json` has correct scripts
- ✅ Environment variables are documented

### **2. Deploy to Railway**
- ✅ Create new Railway project
- ✅ Connect GitHub repository
- ✅ Set root directory to `budgetwise-pro`
- ✅ Configure build settings
- ✅ Deploy

### **3. Configure Environment**
- ✅ Set Supabase variables
- ✅ Set Stripe production keys
- ✅ Set app URLs
- ✅ Set security secrets

### **4. Test Deployment**
- ✅ App loads without errors
- ✅ Authentication works
- ✅ Stripe checkout functions
- ✅ Admin panel accessible

## 🔍 **Troubleshooting**

### **Build Failures**
- Check `railway.json` syntax
- Verify `package.json` scripts
- Ensure all dependencies are in `package.json`

### **Runtime Errors**
- Check environment variables
- Verify Supabase connection
- Check Stripe key configuration

### **Performance Issues**
- Enable Railway's CDN
- Optimize build output
- Monitor resource usage

## 📊 **Post-Deployment**

### **Monitoring**
- Railway logs
- Performance metrics
- Error tracking

### **Domain Setup**
- Custom domain (optional)
- SSL certificate (automatic)
- CDN configuration

### **Scaling**
- Auto-scaling enabled
- Resource monitoring
- Cost optimization

## 🎉 **Success!**

Your BudgetWise Pro app is now live on Railway and ready to accept real subscriptions!

**Live URL**: https://your-app.railway.app

---

## 📞 **Need Help?**

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: Your repository issues
