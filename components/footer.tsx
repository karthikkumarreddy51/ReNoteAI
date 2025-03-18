"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = async (href: string) => {
    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (href.startsWith("/#")) {
      if (pathname === "/") {
        const element = document.getElementById(href.substring(2));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
      if (href === "/products") {
        window.scrollTo(0, 0);
      }
    }
  };

  // Define social links using online image URLs
  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/renoteai/posts/?feedView=all",
      src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      alt: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/renote.ai",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      alt: "Instagram",
    },
    {
      href: "https://www.facebook.com/people/ReNote-AI/61568234070306/",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      alt: "Facebook",
    },
    {
      href: "https://twitter.com/ReNote_AI",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
      alt: "X (Twitter)",
    },
    {
      href: "https://www.youtube.com/@ReNoteAI",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      alt: "YouTube",
    },
  ];

  return (
    <footer id="footer" className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 w-full">
          {/* Contact Us */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ReNote AI Pvt Ltd,
                  <br />
                  T-Hub Phase 2.0, Madhapur,
                  <br />
                  Hyderabad, Telangana, India - 500081
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
                <Link href="mailto:sales@renote.ai" className="text-muted-foreground hover:text-primary">
                  sales@renote.ai
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App - Both images with fixed size */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Download App</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="https://play.google.com/store/apps/details?id=com.renote"
                target="_blank"
                className="block transform transition-all hover:scale-105"
              >
                <Image
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
              <Link
                href="https://apps.apple.com/in/app/renoteai/id6479944118"
                target="_blank"
                className="block transform transition-all hover:scale-105"
              >
                <Image
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                  alt="Download on App Store"
                  width={160}
                  height={48}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.alt}
                  href={social.href}
                  className="transform transition-transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={32}
                    height={32}
                    style={{ width: "32px", height: "32px" }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/products")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/#how-to-use-section")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  How to Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/#achievements-section")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  About Us
                </button>
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
              <Link href="/policies/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/policies/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/policies/shipping" className="text-sm text-muted-foreground hover:text-primary">
                Return & Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
