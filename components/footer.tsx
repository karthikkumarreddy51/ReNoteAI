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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-100" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ReNote AI</h3>
            <p className="text-muted-foreground mb-4">
              Innovative digital note-taking solutions for professionals and students.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/renoteai/posts/?feedView=all"
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/renote.ai?igsh=MTZpNnUwOHpzZTF2cA%3D%3D"
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.facebook.com/people/ReNote-AI/61568234070306/"
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/ReNote_AI?t=65Ubm8s6UJ5NUM2dsBmEcg&s=09"
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
            </div>
          </div>

          {/* Download Now */}
          <div>
            <h3 className="text-lg font-bold mb-4">Download Now</h3>
            <div className="flex flex-col space-y-4">
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

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ReNote AI Pvt Ltd, T-Hub Phase 2.0, Madhapur, Hyderabad, Telangana, India - 500081
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <Link href="tel:+919666363363" className="text-muted-foreground hover:text-primary">
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

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" required />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ReNote AI. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/shipping-policy" className="text-sm text-muted-foreground hover:text-primary">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
