"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Apple,
  Linkedin,
  X,
  Smartphone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {/* Column 1: Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ReNote AI Pvt Ltd,<br />
                  T-Hub Phase 2.0, Madhapur,<br />
                  Hyderabad, Telangana, India - 500081
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <Link
                  href="tel:+919666363363"
                  className="text-muted-foreground hover:text-primary"
                >
                  +91 9666363363, +91 8886663326
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <Link
                  href="mailto:sales@renote.ai"
                  className="text-muted-foreground hover:text-primary"
                >
                  sales@renote.ai
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Follow Us -- moved further right */}
          <div className="md:ml-12">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex flex-col gap-4">
              {/* LinkedIn and Instagram row */}
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/company/renoteai/posts/?feedView=all"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/renote.ai"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
              {/* Facebook and Twitter row */}
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/people/ReNote-AI/61568234070306/"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/ReNote_AI"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <X className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Download Our App */}
          <div>
            <h3 className="text-lg font-bold mb-4">Download Our App</h3>
            <div className="flex flex-col items-start space-y-4">
              <Link
                href="https://apps.apple.com/in/app/renoteai/id6479944118"
                className="text-muted-foreground hover:text-primary flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Apple className="h-5 w-5 mr-2" />
                <span>Apple App Store</span>
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.renote"
                className="text-muted-foreground hover:text-primary flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="h-5 w-5 mr-2" />
                <span>Google Play Store</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Quick Links -- moved further right */}
          <div className="md:ml-12">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-muted-foreground hover:text-primary"
                >
                  App
                </Link>
              </li>
              <li>
                <Link
                  href="/#about-us"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  ReNoteAI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Section */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ReNote AI. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/policies/privacy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="/policies/shipping"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
