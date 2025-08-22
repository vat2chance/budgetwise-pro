import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BudgetWise Pro - Smart Personal & Business Budgeting",
  description: "Connect your accounts, track expenses, and get AI-powered insights to improve your financial health.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#3B82F6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BudgetWise Pro",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BudgetWise Pro" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
