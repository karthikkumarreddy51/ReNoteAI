// Ensure react-hot-toast is installed: npm install react-hot-toast
"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const product = products.find(
    (p) => p.id.toLowerCase() === id.toLowerCase()
  );
  const { addToCart, updateItemQuantity } = useCart();
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (!product) {
    return <div className="container mx-auto p-8">Product not found.</div>;
  }

  // Customization Modal state
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState(() => ({
    coverDesign: product.customizations?.coverDesign[0] || "",
    pageLayout: product.customizations?.pageLayout[0] || "",
    paperType: product.customizations?.paperType[0] || "",
    bindingType: product.customizations?.bindingType[0] || "",
  }));

  let galleryImages: string[] = [];
  let productTitle: string = "";
  let productFeatures: JSX.Element | null = null;
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Zoom state for main image
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({
    backgroundX: "0%",
    backgroundY: "0%",
  });

  // Handlers for Add to Cart
  const handleAddToCart = () => {
    if (product.customizations) {
      setShowCustomizationModal(true);
    } else {
      setQuantity(1); // Ensure quantity is 1 when adding to cart
      addProductToCart();
    }
  };

  const addProductToCart = () => {
    const priceToUse =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
    const productId = product.id + "-" + Object.values(selectedCustomization).join("-");

    addToCart({
      id: productId,
      name: product.name,
      price: priceToUse,
      quantity: quantity,
      image: product.image,
      customization: selectedCustomization,
    });
    setIsAddedToCart(true);
    
    // Add success toast if not showing customization modal
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

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    setQuantity(prev => {
      const newQuantity = action === 'increment' ? prev + 1 : prev - 1;
      if (newQuantity >= 0) {
        if (isAddedToCart) {
          const productId = product.id + "-" + Object.values(selectedCustomization).join("-");
          updateItemQuantity(productId, newQuantity);
        }
        if (newQuantity === 0) {
          setIsAddedToCart(false);
          setQuantity(1); // Reset to 1 when removing from cart
          return 0;
        }
        return newQuantity;
      }
      return prev;
    });
  };

  // Set gallery images and content based on product type
  if (product.id.toLowerCase() === "air") {
    galleryImages = [
      AirImg.src,
      AirGallery2.src,
      AirGallery3.src,
      AirGallery4.src,
      AirGallery5.src,
      AirGallery6.src,
      AirGallery7.src,
      AirGallery8.src,
      AirGallery9.src,
    ];
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
    galleryImages = [
      ClassicImg.src,
      ClassicGallery2.src,
      ClassicGallery3.src,
      ClassicGallery4.src,
      ClassicGallery5.src,
      ClassicGallery6.src,
      ClassicGallery7.src,
      ClassicGallery8.src,
      ClassicGallery9.src,
    ];
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
    galleryImages = [
      EcoImg.src,
      EcoGallery3.src,
      EcoGallery4.src,
      EcoGallery5.src,
      EcoGallery6.src,
      EcoGallery7.src,
      EcoGallery8.src,
      EcoGallery9.src,
    ];
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products">
        <Button variant="ghost">← Back to Products</Button>
      </Link>

      <div className="mt-8 flex flex-col md:flex-row gap-8 relative min-h-screen">
        {/* LEFT SECTION: Thumbnails, Main Image, and Cart */}
        <div className="md:w-3/5 flex flex-col sticky top-8" style={{ height: 'fit-content' }}>
          <div className="flex flex-row">
            {/* Thumbnails Column */}
            <div
              className="flex flex-col gap-2 overflow-y-auto pr-2"
              style={{ maxHeight: "800px", width: "80px" }}
            >
              {galleryImages.map((img: string, index: number) => (
                <div
                  key={index}
                  className={`relative w-[60px] h-[60px] border rounded cursor-pointer flex-shrink-0 ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>

            {/* Main Image Container with Zoom Feature */}
            <div
              ref={imageContainerRef}
              className="relative flex-grow border rounded-lg mb-4 cursor-pointer"
              onMouseEnter={() => setIsZoomActive(true)}
              onMouseMove={(e) => {
                const rect = imageContainerRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                setZoomPos({
                  backgroundX: `${xPercent}%`,
                  backgroundY: `${yPercent}%`,
                });
              }}
              onMouseLeave={() => setIsZoomActive(false)}
            >
              <Image
                src={galleryImages[selectedImage]}
                alt="Main product"
                fill
                className="object-contain transition-transform"
                priority
              />
            </div>
          </div>
          {/* Add to Cart Button */}
          <div className="mt-4">
            {isAddedToCart ? (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    handleQuantityChange('decrement');
                    if (quantity === 1) {
                      setIsAddedToCart(false);
                    }
                  }}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleAddToCart} 
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: Product Details or Zoom View */}
        <div className="md:w-2/5">
          {isZoomActive ? (
            <div
              className="w-full h-[600px] border rounded-lg transition-all duration-200 sticky top-8"
              style={{
                backgroundImage: `url(${galleryImages[selectedImage]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "300%",
                backgroundPosition: `${zoomPos.backgroundX} ${zoomPos.backgroundY}`,
              }}
            ></div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{productTitle}</h1>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-black">
                  ₹{product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-3 text-lg line-through text-gray-500">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
              {productFeatures}
            </div>
          )}
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
