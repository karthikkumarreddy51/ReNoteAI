import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import WhatsAppChat from "@/components/whatsapp-chat"
import SubscriptionPopup from "@/components/subscription-popup"
import { SearchProvider } from "@/context/search-context"
import { Toaster as HotToaster } from "react-hot-toast"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Reusable Notebooks | Customize Your Own",
  description:
    "Design your own custom smart reusable notebook with personalized covers, page layouts, and more. Eco-friendly and innovative.",
  keywords:
    "smart notebook, reusable notebook, custom notebook, personalized notebook, eco-friendly notebook",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <SearchProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <HotToaster
              position="top-center"
              reverseOrder={false}
              containerStyle={{
                top: 80,
              }}
            />
            <WhatsAppChat />
            <SubscriptionPopup />
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  )
}
