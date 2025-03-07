"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ArrowRight, Star, RefreshCw, Shield } from "lucide-react";
import ProductCard from "@/components/product-card";
import SubscriptionPopup from "@/components/subscription-popup";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

// Define your Product interface
interface Product {
  id: string;
  image?: string;
  name: string;
  status?: string;
  description: string;
  rating: number;
  reviewCount: number;
  discountedPrice: number;
  price: number;
  customizations?: {
    coverDesign: string[];
    pageLayout: string[];
    paperType: string[];
    bindingType: string[];
  };
}

export default function HomePage() {
  const { addToCart } = useCart();
  const router = useRouter();

  // Annotate the product parameter with the Product type
  const handleAddToCart = (product: Product) => {
    const priceToUse =
      product.discountedPrice < product.price ? product.discountedPrice : product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price: priceToUse,
      quantity: 1,
      image: product.image,
    });
    router.push("/cart");
  };

  // Updated featured products array in desired order/labels.
  const featuredProducts: Product[] = [
    {
      id: "eco",
      name: "Eco – Sustainable Smart Notebook",
      description: "Eco-friendly and sustainable design for the conscious consumer.",
      price: 29.99,
      discountedPrice: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Eco",
      rating: 4.5,
      reviewCount: 75,
    },
    {
      id: "lite",
      name: "Lite – Lightweight Smart Notebook",
      description: "Slim, lightweight design perfect for everyday note-taking.",
      price: 19.99,
      discountedPrice: 17.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Lite",
      rating: 4.2,
      reviewCount: 50,
    },
    {
      id: "classic",
      name: "Classic – Timeless Smart Notebook",
      description: "Traditional design meets modern functionality in this classic notebook.",
      price: 34.99,
      discountedPrice: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Classic",
      rating: 4.7,
      reviewCount: 120,
    },
    {
      id: "airprint",
      name: "Air Print – AI-Powered Smart Notebook",
      description:
        "Innovative design featuring AI-powered functionalities and air printing capabilities.",
      price: 49.99,
      discountedPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Air Print",
      rating: 4.9,
      reviewCount: 200,
    },
  ];

  // Mock testimonials
  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "I've been using the Smart Notebook for 6 months now and it has completely transformed how I take notes in meetings. The ability to digitize my handwritten notes instantly is a game-changer!",
      rating: 5,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "As a developer, I was skeptical about using a notebook instead of typing, but the Smart Notebook has won me over. The OCR technology is incredibly accurate, and I love having my diagrams and code snippets digitized.",
      rating: 5,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Student",
      content:
        "This notebook has been a lifesaver for my studies. I can take notes in class and have them organized digitally without having to type everything up later. Highly recommend for students!",
      rating: 4,
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                The Smart Notebook That Adapts to Your Needs
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Write, scan, and organize your notes digitally with our innovative reusable smart notebooks.
                Customizable, eco-friendly, and designed for the modern professional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#how-it-works">
                    How It Works
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center mt-8">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${i}`}
                        alt={`Customer ${i}`}
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">4.9</span> from over 2,000 reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
            </div>
          </div>
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

          <Tabs defaultValue="bestsellers" className="mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            <TabsContent value="bestsellers" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="flex flex-col gap-2">
                    <Link legacyBehavior href={`/products/${product.id}`}>
                      <a suppressHydrationWarning>
                        <ProductCard product={product} />
                      </a>
                    </Link>
                    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex flex-col gap-2">
                    <Link legacyBehavior href={`/products/${product.id}`}>
                      <a suppressHydrationWarning>
                        <ProductCard product={{ ...product, status: "New Arrival" }} />
                      </a>
                    </Link>
                    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sale" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(1, 4).map((product) => (
                  <div key={product.id} className="flex flex-col gap-2">
                    <Link legacyBehavior href={`/products/${product.id}`}>
                      <a suppressHydrationWarning>
                        <ProductCard product={{ ...product, status: "Sale" }} />
                      </a>
                    </Link>
                    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  </div>
                ))}
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Smart Notebooks?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our innovative smart notebooks combine the best of traditional writing with modern digital technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Infinitely Reusable</h3>
                <p className="text-muted-foreground">
                  Wipe clean with a damp cloth and reuse thousands of times, reducing paper waste and saving trees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Instant Digitization</h3>
                <p className="text-muted-foreground">
                  Scan your notes with our app to instantly convert them to digital format and sync across all your devices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Organization</h3>
                <p className="text-muted-foreground">
                  Our AI automatically organizes your notes, making them searchable and accessible whenever you need them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Fully Customizable</h3>
                <p className="text-muted-foreground">
                  Choose from various page templates, cover designs, and binding options to create your perfect notebook.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Eco-Friendly</h3>
                <p className="text-muted-foreground">
                  Our notebooks are made from sustainable materials and help reduce paper waste, making them better for the environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our smart notebooks are designed to be intuitive and easy to use. Here's how they work:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-gray-300"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">Write &amp; Create</h3>
              <p className="text-muted-foreground">
                Use your smart notebook just like a regular notebook. Write, sketch, and create with your favorite pen.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-gray-300"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">Scan &amp; Digitize</h3>
              <p className="text-muted-foreground">
                Use our mobile app to scan your pages. Our AI technology converts your handwriting to digital text.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Wipe &amp; Reuse</h3>
              <p className="text-muted-foreground">
                When you're ready, wipe the pages clean with a damp cloth and start fresh. Your notes are safely stored in the cloud.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link href="/products">Get Your Smart Notebook</Link>
            </Button>
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
                We're a team of innovators passionate about combining traditional writing with modern technology. Our mission is to create sustainable, reusable notebooks that enhance productivity and creativity while reducing environmental impact.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2020, we've helped over 100,000 customers worldwide digitize their notes and reduce paper waste. Our smart notebooks are designed with sustainability and functionality in mind.
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
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Our+Team"
                alt="Our Team"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
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
              Don't just take our word for it. Here's what our customers have to say about our smart notebooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Note-Taking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the perfect blend of traditional writing and digital organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Popup Component */}
      <SubscriptionPopup />
    </main>
  );
}
