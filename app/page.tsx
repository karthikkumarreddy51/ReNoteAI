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
import { ArrowRight, Check, CheckCircle, Calendar, Mail, Cloud } from "lucide-react";
import SubscriptionPopup from "@/components/subscription-popup";
import ContactForm from "@/components/contact-form";

// Import images from your local folder
import AirImg from "../images/Air.png";
import ClassicImg from "../images/classic.png";
import EcoImg from "../images/eco.png";
import BookWithAppImg from "../images/Book With App.png";
import HTU1 from "../images/htu1.png";
import HTU2 from "../images/htu2.png";
import HTU3 from "../images/htu3.png";
import HTU4 from "../images/htu4.jpg";
// Updated achievement image imports with relative paths
import NorthStarImg from "../images/achievements/northstar.png";
import GoogleImg from "../images/achievements/google.png";
import MeityImg from "../images/achievements/meity.png";
import MicrosoftImg from "../images/achievements/microsoft.png";
import NvidiaImg from "../images/achievements/nvidia.png";
import AICImg from "../images/achievements/aic.png";
import THubImg from "../images/achievements/thub.png";

interface Product {
  id: string;
  image?: string;
  name: string;
  discountedPrice: number;
  price: number;
  status?: string;
}

export default function HomePage() {
  const featuredProducts: Product[] = [
    { id: "air", name: "Air", image: AirImg.src, price: 2499, discountedPrice: 999 },
    { id: "classic", name: "Renoteclassic", image: ClassicImg.src, price: 2499, discountedPrice: 999 },
    { id: "eco", name: "Eco", image: EcoImg.src, price: 999, discountedPrice: 499 },
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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[85vh]">
            {/* Left side (text) */}
            <div className="relative z-10 space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block text-[#000080]">World’s First</span>
                <span className="block">
                  <span className="text-[#000080]">AI</span>
                  <span className="text-gray-800">-Powered Smart </span>
                  <span className="text-[#21C27D]">Re</span>
                  <span className="text-gray-800">usable Notebook</span>
                </span>
              </h1>
              <p className="text-xl text-gray-600 md:pr-8">
                Experience the future of note-taking with smart templates, AI-powered OCR,
                and seamless digital organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  asChild
                >
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 hover:bg-white/50 transform transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="#how-to-use-section">
                    How To Use
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side (image) */}
            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={BookWithAppImg}
                    alt="ReNote AI Smart Notebook"
                    fill
                    className="object-contain"
                    priority
                  />
                  {/* Decorative elements */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full filter blur-3xl opacity-75"></div>
                  <div className="absolute top-1/4 -right-12 w-24 h-24 bg-blue-500/20 rounded-full"></div>
                  <div className="absolute bottom-1/4 -left-12 w-24 h-24 bg-indigo-500/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes hero-float {
          0% {
            transform: translate(0, 0) rotate(0) scale(1);
          }
          25% {
            transform: translate(-5px, -10px) rotate(-1deg) scale(1.01);
          }
          50% {
            transform: translate(5px, 5px) rotate(1deg) scale(1.02);
          }
          75% {
            transform: translate(10px, -5px) rotate(0deg) scale(1.01);
          }
          100% {
            transform: translate(0, 0) rotate(0) scale(1);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
            opacity: 0.4;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.8;
          }
        }

        .animate-hero-float {
          animation: hero-float 12s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Featured Products */}
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

      {/* Why Choose ReNote AI */}
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
              {/* Feature Cards */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
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
                      d="M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
          </div>
        </div>
      </section>

      {/* How To Use ReNote AI Section */}
      <section id="how-to-use-section" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              How To Use ReNote AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless note-taking with our smart reusable notebook
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                image: HTU1,
                step: "Step 1",
                title: "Write, Erase & Perfect",
                content: (
                  <div className="space-y-6">
                    {/* Image Container with Writing Animation */}
                    <div className="relative h-[400px] mb-8 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl group-hover:scale-110 transition-transform duration-500"></div>
                      <Image
                        src={HTU1}
                        alt="Use Pilot Frixion Pens"
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
                    </div>

                    {/* Interactive Writing Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Write', 'Erase', 'Perfect'].map((step, index) => (
                        <div key={step} className="transform hover:-translate-y-1 transition-all duration-300">
                          <div className="flex flex-col items-center p-6 h-full rounded-xl bg-gradient-to-br from-green-50 to-green-50/50 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="text-3xl font-bold text-green-600 mb-2">{index + 1}</div>
                            <h4 className="font-semibold text-gray-900 text-center">{step}</h4>
                            <p className="text-gray-600 mt-1 text-center text-sm">
                              {step === 'Write' && "Express your thoughts freely with Pilot Frixion Pens"}
                              {step === 'Erase' && "Mistakes happen - just erase and start again"}
                              {step === 'Perfect' && "Keep refining until it's just right"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature Highlights */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Unlimited rewrites with Pilot Frixion Pens
                        </li>
                        <li className="flex items-center text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          No paper waste - environmentally friendly
                        </li>
                        <li className="flex items-center text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Smooth writing experience like traditional paper
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                image: HTU2,
                step: "Step 2",
                title: "Smart Sync & Integration",
                content: (
                  <div className="space-y-6">
                    {/* Image Container */}
                    <div className="relative h-[400px] mb-8 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl group-hover:scale-110 transition-transform duration-500"></div>
                      <Image
                        src={HTU2}
                        alt="Smart Sync & Integration"
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: <CheckCircle />, title: 'Task Management', desc: 'Seamless sync with Google Tasks, Apple Reminders & Microsoft To-Do' },
                        { icon: <Calendar />, title: 'Meeting Integration', desc: 'Direct scheduling with MS Teams & Google Meet' },
                        { icon: <Mail />, title: 'Meeting Minutes', desc: 'Share MOM via Gmail, Outlook & other platforms' },
                        { icon: <Cloud />, title: 'Cloud Storage', desc: 'Sync with Google Drive, OneDrive & Personal Drive' }
                      ].map((item, i) => (
                        <div key={i} className="transform hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-start space-x-3 p-6 h-full rounded-xl bg-gradient-to-br from-green-50 to-green-50/50 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex-shrink-0 p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full">
                              <div className="h-5 w-5 text-white">{item.icon}</div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                image: HTU3,
                step: "Step 3",
                title: "AI Bot & OCR",
                description: "Convert handwriting to digital text with AI assistance. Use AI summarization and smart search for quick access."
              },
              {
                image: HTU4,
                step: "Step 4",
                title: "Effortless Erasing",
                description: "Use the in-built eraser in the pen to undo, and to erase the full page use a wet cloth or tissue."
              }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-primary/90 text-white px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {item.step}
                  </span>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{item.title}</h3>
                  {typeof item.description === 'string' ? (
                    <>
                      <div className="relative h-[400px] mb-6 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl group-hover:scale-110 transition-transform duration-500"></div>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                    </>
                  ) : (
                    item.content
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Achievements speak for itself
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                image: NorthStarImg,
                title: "Dubai Expo",
                desc: "Proudly Exhibited at the Indian Pavilion @ Dubai Expo"
              },
              {
                image: GoogleImg,
                title: "Google App Scale Academy",
                desc: "Recognized as India's one of top 100 potential Mobile APP"
              },
              {
                image: MeityImg,
                title: "MEITY Startup Hub",
                desc: "Recognized by Ministry of Electronics and Information"
              },
              {
                image: MicrosoftImg,
                title: "Microsoft",
                desc: "Part of Microsoft Founder's Hub"
              },
              {
                image: NvidiaImg,
                title: "NVIDIA",
                desc: "Inception Program Member"
              },
              {
                image: AICImg,
                title: "AIC",
                desc: "Incubated with Atal Innovation Centre"
              },
              {
                image: THubImg,
                title: "T-Hub",
                desc: "Incubated with World's Largest Innovation Campus with wide opportunity of Global Reach"
              }
            ].map((achievement, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col items-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 text-center">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Quote */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Testimonials
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 bg-gray-50 rounded-2xl">
              <svg 
                className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-gray-200" 
                fill="currentColor" 
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <div className="relative">
                <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                  A big shoutout to ReNoteAI for the wonderful gift and what an awesome product. 
                  The smart reusable notebook is such a big relief from the overpriced and over 
                  sensitive gadgets like ipad and remarkable. In less than 24hrs, i am hooked to it. 
                  A regular writing device which satisfies the exercise needs of my fingers and wrist 
                  while keeping the mind agile by staying in the writing flow without tech interference.
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">Amita Vikram Pratap</p>
                    <p className="text-gray-600">Co Founder – MAV Brand Stories LLC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactForm />
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