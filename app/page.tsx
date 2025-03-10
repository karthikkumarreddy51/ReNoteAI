"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { ArrowRight, Check } from "lucide-react";
import SubscriptionPopup from "@/components/subscription-popup";

// Import images from your local folder
import AirImg from "../images/Air.png";
import ClassicImg from "../images/classic.png";
import EcoImg from "../images/eco.png";
import BookWithAppImg from "../images/Book With App.png";
import HTU1 from "../images/htu1.png";
import HTU2 from "../images/htu2.png";
import HTU3 from "../images/htu3.png";
import HTU4 from "../images/htu4.jpg";

interface Product {
  id: string;
  image?: string;
  name: string;
  discountedPrice: number;
  price: number;
  status?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function HomePage() {
  const featuredProducts: Product[] = [
    { id: "air", name: "Air", image: AirImg.src, price: 2499, discountedPrice: 999 },
    { id: "classic", name: "Renoteclassic", image: ClassicImg.src, price: 2499, discountedPrice: 999 },
    { id: "eco", name: "Eco", image: EcoImg.src, price: 999, discountedPrice: 499 },
  ];

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "I've been using for 6 months now and it has completely transformed how I take notes in meetings. The ability to digitize my handwritten notes instantly is a game-changer!",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "As a developer, I was skeptical about using a notebook instead of typing, but the Smart Notebook has won me over. The OCR technology is incredibly accurate, and I love having my diagrams and code snippets digitized.",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Student",
      content:
        "This notebook has been a lifesaver for my studies. I can take notes in class and have them organized digitally without having to type everything up later. Highly recommend for students!",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ];

  // Renders a single featured product card
  const renderProduct = (product: Product) => {
    return (
      <Link
        href={`/products/${product.id}`}
        key={product.id}
        className="border p-4 rounded-md hover:shadow-lg transition"
      >
        {/* Image Section */}
        <div className="relative w-full h-80 overflow-hidden">
          {product.id === "air" || product.id === "eco" ? (
            <div
              className="w-full h-full rounded-md transition-transform duration-500 hover:scale-105"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              loading="eager"
              className="object-contain rounded-md transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

        {/* Text Section */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <div className="mt-2">
            {product.discountedPrice < product.price ? (
              <>
                <span className="font-bold text-lg">
                  Rs.{product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through ml-2">
                  Rs.{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg">
                Rs.{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <main>
      {/* 
        Updated Hero Section
        - Text on the left (40% width)
        - Image on the right (60% width)
        - Continuous "floating" transition on the image
      */}
      <section className="flex items-center w-full h-[80vh] overflow-hidden px-6">
        {/* Left side (text) */}
        <div className="w-2/5 flex flex-col justify-center space-y-6 p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            World's First AI-Powered Smart Reusable Notebook
          </h1>
          <p className="text-xl text-gray-700">
            Experience the future of note-taking with smart templates, AI-powered OCR,
            and seamless digital organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-to-use">How To Use</Link>
            </Button>
          </div>
        </div>

        {/* Right side (image) */}
        <div className="w-3/5 h-full relative">
          <Image
            src={BookWithAppImg}
            alt="ReNote AI Smart Notebook"
            fill
            className="object-cover animate-floating transition-transform duration-1000"
            priority
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular smart notebooks and accessories.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(renderProduct)}
              </div>
            </TabsContent>
            <TabsContent value="best-sellers" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts
                  .filter((product) => product.id === "classic")
                  .map(renderProduct)}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose ReNote AI Section */}
      <section id="why-choose-us" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Why Choose ReNote AI?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              ReNote AI is the future of note-taking—a smart reusable notebook with an AI-powered app that converts handwritten notes into digital text and includes an AI assistant.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Feature Cards in a single row */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Eco-friendly & Reusable</h3>
                <p className="text-sm text-gray-600">Made with tree-free paper that is waterproof and tear-resistant.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">AI-Powered OCR</h3>
                <p className="text-sm text-gray-600">Convert, summarize &amp; translate your handwritten notes instantly.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Smart Templates</h3>
                <p className="text-sm text-gray-600">Pre-built formats for tasks, meetings &amp; more.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Smart Scanning</h3>
                <p className="text-sm text-gray-600">Auto-capture &amp; enhance documents.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Perfect For Everyone</h3>
                <p className="text-sm text-gray-600">Ideal for Professionals, Students &amp; Businesses.</p>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-700 mt-12">
              Write. Erase. Digitize. Organize.
            </p>
          </div>
        </div>
      </section>

      {/* How To Use ReNote AI Section */}
      <section id="how-to-use" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How To Use ReNote AI</h2>
          </div>
          <div className="space-y-24">
            {/* Step 1: Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-3/5">
                <Image
                  src={HTU1}
                  alt="Use Pilot Frixion Pens"
                  width={800}
                  height={600}
                  className="object-contain w-full"
                />
              </div>
              <div className="md:w-2/5 md:pl-12">
                <h3 className="text-2xl font-bold mb-4">1. Use Pilot Frixion Pens</h3>
                <p className="text-lg">
                  Write and rewrite until it’s right using Pilot Frixion Pens as the paper
                  and ink are in tune for unlimited do-overs.
                </p>
              </div>
            </div>
            {/* Step 2: Image Right, Text Left */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-3/5">
                <Image
                  src={HTU2}
                  alt="Scan with ReNote AI App"
                  width={800}
                  height={600}
                  className="object-contain w-full"
                />
              </div>
              <div className="md:w-2/5 md:pr-12">
                <h3 className="text-2xl font-bold mb-2">
                  2. Scan with ReNote AI App and Sync with Your Favourite Apps
                </h3>
                <p className="text-lg mb-2">
                  • Use the To-Do Template and sync seamlessly with Google Tasks, Apple Reminders, and Microsoft To-Do.
                </p>
                <p className="text-lg mb-2">
                  • Schedule meetings effortlessly with Microsoft Teams and Google Meet integration.
                </p>
                <p className="text-lg mb-2">
                  • Create and share MOM (Minutes of Meeting) via Gmail, Outlook, and other email platforms.
                </p>
                <p className="text-lg">
                  • Cloud sync with Google Drive, OneDrive, and Personal Drive.
                </p>
              </div>
            </div>
            {/* Step 3: Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-3/5">
                <Image
                  src={HTU3}
                  alt="AI Bot & OCR"
                  width={800}
                  height={600}
                  className="object-contain w-full"
                />
              </div>
              <div className="md:w-2/5 md:pl-12">
                <h3 className="text-2xl font-bold mb-2">3. AI Bot &amp; OCR</h3>
                <p className="text-lg">
                  • AI Summarization &amp; Smart Search for quick access to important notes.
                  <br />
                  • Handwriting to Digital Text (OCR) with AI Assistance.
                </p>
              </div>
            </div>
            {/* Step 4: Image Right, Text Left */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-3/5">
                <Image
                  src={HTU4}
                  alt="Effortless Erasing"
                  width={800}
                  height={600}
                  className="object-contain w-full"
                />
              </div>
              <div className="md:w-2/5 md:pr-12">
                <h3 className="text-2xl font-bold mb-2">4. Effortless Erasing</h3>
                <p className="text-lg">
                  Use the in-built eraser in the pen to undo, and to erase the full page use a wet cloth or tissue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Smart Notebooks</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're a team of innovators passionate about combining
                traditional writing with modern technology. Our mission is to
                create sustainable, reusable notebooks that enhance productivity
                and creativity while reducing environmental impact.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2020, we've helped over 100,000 customers worldwide
                digitize their notes and reduce paper waste. Our smart notebooks
                are designed with sustainability and functionality in mind.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Saved over 10 million sheets of paper</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>100% carbon-neutral shipping</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Sustainable materials and manufacturing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>1% of profits donated to environmental causes</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Our+Team"
                alt="Our Team"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to
              say about our smart notebooks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="mb-6 text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Note-Taking?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the perfect
            blend of traditional writing and digital organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Popup Component */}
      <SubscriptionPopup />

      {/* Continuous "floating" animation for the hero image */}
      <style jsx global>{`
        @keyframes floating {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-floating {
          animation: floating 10s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
