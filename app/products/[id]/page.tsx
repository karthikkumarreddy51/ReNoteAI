'use client';
// Ensure react-hot-toast is installed: npm install react-hot-toast
"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CheckCircle } from "lucide-react"; // Add this import at the top with other imports

// Main images
import AirImg from "../../../images/Air.png";
import ClassicImg from "../../../images/classic.png";
import EcoImg from "../../../images/eco.png";

// Gallery images for Air
import AirGallery2 from "../../../images/Air2.png";
import AirGallery3 from "../../../images/classic/3.png";
import AirGallery4 from "../../../images/classic/4.png";
import AirGallery5 from "../../../images/classic/5.png";
import AirGallery6 from "../../../images/classic/6.png";
import AirGallery7 from "../../../images/classic/7.png";
import AirGallery8 from "../../../images/classic/8.png";
import AirGallery9 from "../../../images/classic/9.jpg";

// Gallery images for Classic
import ClassicGallery2 from "../../../images/classic/2.png";
import ClassicGallery3 from "../../../images/classic/3.png";
import ClassicGallery4 from "../../../images/classic/4.png";
import ClassicGallery5 from "../../../images/classic/5.png";
import ClassicGallery6 from "../../../images/classic/6.png";
import ClassicGallery7 from "../../../images/classic/7.png";
import ClassicGallery8 from "../../../images/classic/8.png";
import ClassicGallery9 from "../../../images/classic/9.jpg";

// Gallery images for Eco (removed EcoGallery2)
import EcoGallery3 from "../../../images/classic/3.png";
import EcoGallery4 from "../../../images/classic/4.png";
import EcoGallery5 from "../../../images/classic/5.png";
import EcoGallery6 from "../../../images/classic/6.png";
import EcoGallery7 from "../../../images/classic/7.png";
import EcoGallery8 from "../../../images/classic/8.png";
import EcoGallery9 from "../../../images/classic/9.jpg";

// Product interface
interface Product {
  id: string;
  image?: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  discountedPrice: number;
  customizations?: {
    coverDesign: string[];
    pageLayout: string[];
    paperType: string[];
    bindingType: string[];
  };
}

// Product data
const products: Product[] = [
  {
    id: "air",
    name: "ReNote AI Air",
    description: "Short description for listing",
    price: 2499,
    discountedPrice: 999,
    image: AirImg.src,
    customizations: {
      coverDesign: ["Logo", "Text", "Images", "QR Code"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Erasable", "Premium"],
      bindingType: ["Spiral Bound", "Glue Bound"],
    },
  },
  {
    id: "classic",
    name: "ReNote AI Classic",
    description: "Short description for listing",
    price: 2499,
    discountedPrice: 999,
    image: ClassicImg.src,
    customizations: {
      coverDesign: ["Logo", "Text", "Images"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Premium"],
      bindingType: ["Spiral Bound", "Glue Bound"],
    },
  },
  {
    id: "eco",
    name: "ReNote AI Eco",
    description: "Short description for listing",
    price: 999,
    discountedPrice: 499,
    image: EcoImg.src,
    customizations: {
      coverDesign: ["Logo", "Text", "Images", "QR Code"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Recycled"],
      bindingType: ["Glue Bound", "Spiral Bound"],
    },
  },
];

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const isInImageBounds = (x: number, y: number, rect: DOMRect): boolean => {
  return x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
};

const calculateZoomPosition = (
  x: number, 
  y: number, 
  rect: DOMRect
): { x: number; y: number } | null => {
  // Calculate percentages with full range
  const xPercent = Math.round((x / rect.width) * 100);
  const yPercent = Math.round((y / rect.height) * 100);
  
  // Return null if cursor is outside the image bounds
  if (xPercent < 0 || xPercent > 100 || yPercent < 0 || yPercent > 100) {
    return null;
  }

  // Allow full range of motion (0-100%)
  return { x: xPercent, y: yPercent };
};

const ZOOM_MAGNIFICATION = 2.5;
const THROTTLE_MS = 16;

// Throttle helper function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const router = useRouter();
  const product = products.find((p) => p.id.toLowerCase() === id.toLowerCase());

  // Early return if no product found
  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  // All state declarations moved to top
  const { addToCart, updateItemQuantity } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState(() => ({
    coverDesign: product.customizations?.coverDesign[0] || "",
    pageLayout: product.customizations?.pageLayout[0] || "",
    paperType: product.customizations?.paperType[0] || "",
    bindingType: product.customizations?.bindingType[0] || "",
  }));

  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomViewRef = useRef<HTMLDivElement>(null);
  const zoomPositionRef = useRef({ x: 50, y: 50 });

  // Gallery and content setup
  const galleryImages: string[] = [];
  let productTitle: string = "";
  let productFeatures: JSX.Element | null = null;

  if (product.id.toLowerCase() === "air") {
    galleryImages.push(
      AirImg.src,
      AirGallery2.src,
      AirGallery3.src,
      AirGallery4.src,
      AirGallery5.src,
      AirGallery6.src,
      AirGallery7.src,
      AirGallery8.src,
      AirGallery9.src,
    );
    productTitle =
      "ReNote AI Air – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance";
    productFeatures = (
      <>
        <p className="text-gray-600 mb-6">
          ReNote AI Air is a next-generation AI-powered smart reusable notebook
          designed for professionals, students, and creatives who want to
          digitize, organize, and enhance their notes with AI. Featuring 48
          reusable, waterproof, and tear-resistant pages, this eco-friendly
          notebook integrates AI handwriting recognition, smart templates, and
          cloud sync, making it the ultimate productivity tool.
        </p>
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Key Features:</h2>
          <div>
            <h3 className="font-semibold">
              ✅ Smart Templates for Seamless Productivity:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                To-Do List (2 Pages) – Sync tasks effortlessly with Google
                Tasks, Apple Reminders, and Microsoft To-Do.
              </li>
              <li>
                Schedule Meetings (2 Pages) – Plan efficiently with MS Teams and
                Google Meet integration.
              </li>
              <li>
                Minutes of Meeting (2 Pages) – Capture MOMs and share them
                instantly via Gmail, Outlook, and other email platforms.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ Versatile Page Layouts:</h3>
            <ul className="list-disc pl-6">
              <li>
                20 White Pages – Ideal for sketches, diagrams, and
                brainstorming.
              </li>
              <li>20 Lined Pages – Perfect for structured writing.</li>
              <li>2 Dotted Pages – Great for bullet journaling.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              ✅ Premium Durability & Reusability:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                100% Waterproof & Non-Tearable Pages – Made with durable PP
                (Polypropylene) material.
              </li>
              <li>
                Reusable up to 100 times – Erase effortlessly with a microfiber
                cloth and Pilot Frixion Pen.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ AI & Cloud Integration:</h3>
            <ul className="list-disc pl-6">
              <li>Handwriting to Digital Text (OCR) with AI Assistance.</li>
              <li>
                Auto Scan & Cloud Sync with Google Drive, OneDrive, and Personal
                Drive.
              </li>
              <li>
                AI Summarization & Smart Search for quick access to important
                notes.
              </li>
              <li>
                Works with ReNote AI App (Android & iOS) – Convert handwritten
                notes, summarize content, and access AI-powered organization
                tools.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              Eco-Friendly Packaging & Inclusions:
            </h3>
            <ul className="list-disc pl-6">
              <li>ReNote AI Air Smart Reusable Notebook (A5 Size)</li>
              <li>Pilot Frixion Pen (Erasable Ink)</li>
              <li>Microfiber Cloth (For Easy Erasing)</li>
            </ul>
          </div>
          <p className="text-gray-600">
            Transform the way you take notes with ReNote AI Air – a smart,
            eco-friendly, and AI-enhanced notebook designed for the future of
            work and learning.
          </p>
        </div>
      </>
    );
  } else if (product.id.toLowerCase() === "classic") {
    galleryImages.push(
      ClassicImg.src,
      ClassicGallery2.src,
      ClassicGallery3.src,
      ClassicGallery4.src,
      ClassicGallery5.src,
      ClassicGallery6.src,
      ClassicGallery7.src,
      ClassicGallery8.src,
      ClassicGallery9.src,
    );
    productTitle =
      "ReNote AI Classic – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance";
    productFeatures = (
      <>
        <p className="text-gray-600 mb-6">
          ReNote AI Classic is a next-generation AI-powered smart reusable
          notebook designed for professionals, students, and creatives who want
          to digitize, organize, and enhance their notes with AI. Featuring 50
          reusable, waterproof, and tear-resistant pages, this elegant hardbound
          notebook integrates AI handwriting recognition, smart templates, and
          cloud sync, making it the ultimate productivity tool.
        </p>
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Key Features:</h2>
          <div>
            <h3 className="font-semibold">
              ✅ Smart Templates for Seamless Productivity:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                To-Do List (2 Pages) – Sync tasks effortlessly with Google
                Tasks, Apple Reminders, and Microsoft To-Do.
              </li>
              <li>
                Schedule Meetings (2 Pages) – Plan efficiently with MS Teams and
                Google Meet integration.
              </li>
              <li>
                Minutes of Meeting (2 Pages) – Capture MOMs and share them
                instantly via Gmail, Outlook, and other email platforms.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ Versatile Page Layouts:</h3>
            <ul className="list-disc pl-6">
              <li>
                20 White Pages – Ideal for sketches, diagrams, and
                brainstorming.
              </li>
              <li>20 Lined Pages – Perfect for structured writing.</li>
              <li>2 Dotted Pages – Great for bullet journaling.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              ✅ Premium Durability & Reusability:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                100% Waterproof & Non-Tearable Pages – Built for long-lasting
                use.
              </li>
              <li>
                Hardbound Cover – Designed for a classic and premium look,
                ensuring durability and elegance.
              </li>
              <li>
                Reusable up to 100 times – Erase effortlessly with a microfiber
                cloth and Pilot Frixion Pen.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ AI & Cloud Integration:</h3>
            <ul className="list-disc pl-6">
              <li>Handwriting to Digital Text (OCR) with AI Assistance.</li>
              <li>
                Auto Scan & Cloud Sync with Google Drive, OneDrive, and Personal
                Drive.
              </li>
              <li>
                AI Summarization & Smart Search for quick access to important
                notes.
              </li>
              <li>
                Works with ReNote AI App (Android & iOS) – Convert handwritten
                notes, summarize content, and access AI-powered organization
                tools.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              Eco-Friendly Packaging & Inclusions:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                ReNote AI Classic Smart Reusable Notebook (A5 Size, Hardbound
                Cover)
              </li>
              <li>Pilot Frixion Pen (Erasable Ink)</li>
              <li>Microfiber Cloth (For Easy Erasing)</li>
            </ul>
          </div>
          <p className="text-gray-600">
            Experience the perfect blend of tradition and technology with ReNote
            AI Classic – a premium, AI-enhanced smart reusable notebook crafted
            for the future of work and learning.
          </p>
        </div>
      </>
    );
  } else {
    // Eco
    galleryImages.push(
      EcoImg.src,
      EcoGallery3.src,
      EcoGallery4.src,
      EcoGallery5.src,
      EcoGallery6.src,
      EcoGallery7.src,
      EcoGallery8.src,
      EcoGallery9.src,
    );
    productTitle =
      "ReNote AI Eco – Sustainable Smart Notebook with Smart Templates & AI Assistance";
    productFeatures = (
      <>
        <p className="text-gray-600 mb-6">
          ReNote AI Eco is a single-use, eco-friendly smart notebook designed
          for professionals, students, and creatives who want to digitize,
          organize, and enhance their notes with AI while embracing
          sustainability. Featuring 92 natural shade pages and a kraft paper
          cover, this notebook integrates AI handwriting recognition, smart
          templates, and cloud sync, making it an essential tool for
          productivity and organization.
        </p>
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Key Features:</h2>
          <div>
            <h3 className="font-semibold">
              ✅ Smart Templates for Seamless Productivity:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                To-Do List (4 Pages) – Organize tasks efficiently and sync with
                Google Tasks, Apple Reminders, and Microsoft To-Do.
              </li>
              <li>
                Schedule Meetings (4 Pages) – Plan effortlessly with MS Teams and
                Google Meet integration.
              </li>
              <li>
                Minutes of Meeting (4 Pages) – Capture MOMs and send them
                instantly via Gmail, Outlook, and other email platforms.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ Versatile Page Layouts:</h3>
            <ul className="list-disc pl-6">
              <li>40 Lined Pages – Perfect for structured writing.</li>
              <li>20 Plain Pages – Ideal for sketches and brainstorming.</li>
              <li>20 Dotted Pages – Great for bullet journaling.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ Eco-Friendly & Sustainable:</h3>
            <ul className="list-disc pl-6">
              <li>
                Natural Shade Inner Pages – Comfortable writing experience,
                environmentally responsible.
              </li>
              <li>
                Kraft Paper Cover – Durable, recyclable, minimal carbon
                footprint.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">✅ AI & Cloud Integration:</h3>
            <ul className="list-disc pl-6">
              <li>Handwriting to Digital Text (OCR) with AI Assistance.</li>
              <li>
                Auto Scan & Cloud Sync with Google Drive, OneDrive, and Personal
                Drive.
              </li>
              <li>
                AI Summarization & Smart Search for quick access to important
                notes.
              </li>
              <li>
                Works with ReNote AI App (Android & iOS) – Convert handwritten
                notes, summarize content, and access AI-powered organization
                tools.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              Eco-Friendly Packaging & Inclusions:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                ReNote AI Eco Smart Notebook (A5 Size, Kraft Paper Cover, 92
                Natural Shade Pages)
              </li>
              <li>
                ReNote AI Erasable Pen (Smooth writing & erasable for
                corrections)
              </li>
            </ul>
          </div>
          <p className="text-gray-600">
            Embrace a sustainable, tech-powered note-taking experience with
            ReNote AI Eco – the perfect blend of eco-conscious design and
            AI-powered productivity.
          </p>
        </div>
      </>
    );
  }

  // Effects
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovering) {
      timer = setInterval(() => {
        setSelectedImage((prev: number) => (prev + 1) % galleryImages.length);
      }, 10000);
    }
    return () => clearInterval(timer);
  }, [galleryImages.length, isHovering]);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (!isHovering) {
      progressTimer = setInterval(() => {
        setProgress((prev: number) => (prev + 1) % 100);
      }, 100);
    }
    return () => clearInterval(progressTimer);
  }, [selectedImage, isHovering]);

  // Reset progress when image changes
  useEffect(() => {
    setProgress(0);
  }, [selectedImage]);

  // Handlers
  const handleAddToCart = () => {
    if (product.customizations) {
      setShowCustomizationModal(true);
    } else {
      setQuantity(1);
      addProductToCart();
    }
  };

  const addProductToCart = () => {
    const priceToUse = product.discountedPrice < product.price ? product.discountedPrice : product.price;
    const productId = `${product.id}-${Object.values(selectedCustomization).join("-")}`;

    addToCart({
      id: productId,
      name: product.name,
      price: priceToUse,
      quantity,
      image: product.image,
      customization: selectedCustomization,
    });
    setIsAddedToCart(true);
    
    if (!product.customizations) {
      toast.success(`${product.name} added to cart`, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#4F46E5',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '🛒',
      });
    }
  };

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    setQuantity((prev: number) => {
      const newQuantity = action === 'increment' ? prev + 1 : prev - 1;
      if (newQuantity >= 0) {
        if (isAddedToCart) {
          const productId = `${product.id}-${Object.values(selectedCustomization).join("-")}`;
          updateItemQuantity(productId, newQuantity);
        }
        if (newQuantity === 0) {
          setIsAddedToCart(false);
          setQuantity(1);
          return 0;
        }
        return newQuantity;
      }
      return prev;
    });
  };

  const handleBuyNow = () => {
    const priceToUse = product.discountedPrice < product.price ? product.discountedPrice : product.price;
    const productId = `${product.id}-${Object.values(selectedCustomization).join("-")}`;
    
    addToCart({
      id: productId,
      name: product.name,
      price: priceToUse,
      quantity: 1,
      image: product.image,
      customization: selectedCustomization,
    });
    
    router.push("/checkout");
  };

  // Add handleZoom function
  const handleZoom = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const container = imageContainerRef.current;
      const zoomView = zoomViewRef.current;
      if (!container || !zoomView) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only update if cursor is within image bounds
      if (isInImageBounds(x, y, rect)) {
        const position = calculateZoomPosition(x, y, rect);
        if (position) {
          const { x: xPos, y: yPos } = position;
          zoomView.style.backgroundPosition = `${xPos}% ${yPos}%`;
        }
      }
    }, THROTTLE_MS),
    []
  );

  // Add confirmAddToCart function
  const confirmAddToCart = () => {
    addProductToCart();
    setShowCustomizationModal(false);
    setIsInCart(true);
    toast.success(`${product.name} added to cart`, {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#4F46E5',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '🛒',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products">
        <Button variant="ghost">← Back to Products</Button>
      </Link>

      <div className="mt-8 flex flex-col md:flex-row gap-8 relative min-h-screen">
        {/* LEFT SECTION: Thumbnails, Main Image, and Cart */}
        <div className="md:w-3/5 relative">
          <div className="sticky top-8">
            <div className="flex flex-row">
              {/* Thumbnails Column */}
              <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                {galleryImages.map((img: string, index: number) => (
                  <div
                    key={index}
                    className={`relative w-[60px] h-[60px] border rounded cursor-pointer flex-shrink-0 ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                    onClick={() => {
                      setSelectedImage(index);
                      setProgress(0); // Reset progress on manual selection
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                    {/* Add indicator for current image */}
                    {selectedImage === index && !isHovering && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                        <div
                          className="h-full bg-blue-600 transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Image Container */}
              <div
                ref={imageContainerRef}
                className="relative flex-grow border rounded-lg mb-4 cursor-zoom-in overflow-hidden"
                onMouseEnter={() => {
                  setIsHovering(true);
                  setIsZooming(true);
                }}
                onMouseMove={handleZoom}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setIsZooming(false);
                }}
              >
                <Image
                  src={galleryImages[selectedImage]}
                  alt="Main product"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-4 flex flex-col space-y-4">
              {isAddedToCart ? (
                <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange('decrement')}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange('increment')}
                    >
                      +
                    </Button>
                  </div>
                  <Link href="/cart">
                    <Button>View Cart</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    variant="outline"
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Product Details & Zoom View */}
        <div className="md:w-2/5">
          <div className="sticky top-24 space-y-8">
            {/* Product Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">{productTitle}</h1>
              
              {/* Price Section with Better Styling */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  ₹{product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-green-600 font-medium">
                  {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                </span>
              </div>

              {/* Quick Highlights */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI-Powered Smart Templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Reusable up to 100 times</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cloud Integration & Sync</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Features with Better Layout */}
            <div className="prose prose-blue max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                {productFeatures}
              </div>
            </div>

            {/* Zoom View - Keep existing zoom functionality */}
            {isZooming && (
              <div 
                className="fixed top-20 right-4 z-50"
                style={{ 
                  width: '600px', 
                  height: '600px',
                  maxWidth: '40vw',
                  maxHeight: 'calc(100vh - 120px)'  // Leave space for header
                }}
              >
                <div
                  ref={zoomViewRef}
                  className="w-full h-full border rounded-lg overflow-hidden bg-white shadow-xl"
                  style={{
                    backgroundImage: `url(${galleryImages[selectedImage]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${ZOOM_MAGNIFICATION * 100}%`,
                    backgroundPosition: "center",
                    willChange: "background-position"
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomizationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Customize Your Notebook</h2>
            {product.customizations?.coverDesign && (
              <div className="mb-4">
                <label className="block mb-1">Cover Design:</label>
                <select
                  value={selectedCustomization.coverDesign}
                  onChange={(e) =>
                    setSelectedCustomization((prev) => ({
                      ...prev,
                      coverDesign: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                >
                  {product.customizations.coverDesign.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.customizations?.pageLayout && (
              <div className="mb-4">
                <label className="block mb-1">Page Layout:</label>
                <select
                  value={selectedCustomization.pageLayout}
                  onChange={(e) =>
                    setSelectedCustomization((prev) => ({
                      ...prev,
                      pageLayout: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                >
                  {product.customizations.pageLayout.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.customizations?.paperType && (
              <div className="mb-4">
                <label className="block mb-1">Paper Type:</label>
                <select
                  value={selectedCustomization.paperType}
                  onChange={(e) =>
                    setSelectedCustomization((prev) => ({
                      ...prev,
                      paperType: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                >
                  {product.customizations.paperType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.customizations?.bindingType && (
              <div className="mb-4">
                <label className="block mb-1">Binding Type:</label>
                <select
                  value={selectedCustomization.bindingType}
                  onChange={(e) =>
                    setSelectedCustomization((prev) => ({
                      ...prev,
                      bindingType: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                >
                  {product.customizations.bindingType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowCustomizationModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmAddToCart}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
