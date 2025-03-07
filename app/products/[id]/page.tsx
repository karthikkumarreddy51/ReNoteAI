"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

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

const products: Product[] = [
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
    customizations: {
      coverDesign: ["Logo", "Text", "Images", "QR Code"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Recycled"],
      bindingType: ["Glue Bound", "Spiral Bound"],
    },
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
    customizations: {
      coverDesign: ["Logo", "Text"],
      pageLayout: ["Lined", "Blank"],
      paperType: ["Standard"],
      bindingType: ["Glue Bound"],
    },
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
    customizations: {
      coverDesign: ["Logo", "Text", "Images"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Premium"],
      bindingType: ["Spiral Bound", "Glue Bound"],
    },
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
    customizations: {
      coverDesign: ["Logo", "Text", "Images", "QR Code"],
      pageLayout: ["Lined", "Dot Grid", "Blank"],
      paperType: ["Erasable", "Premium"],
      bindingType: ["Spiral Bound", "Glue Bound"],
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
  // Find the product in a case-insensitive manner.
  const product = products.find((p) => p.id.toLowerCase() === id.toLowerCase());
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    return <div className="container mx-auto p-8">Product not found.</div>;
  }

  // State to control whether to show the customization modal.
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  // Initialize the selected customization with the first available option for each field.
  const [selectedCustomization, setSelectedCustomization] = useState(() => ({
    coverDesign: product.customizations?.coverDesign[0] || "",
    pageLayout: product.customizations?.pageLayout[0] || "",
    paperType: product.customizations?.paperType[0] || "",
    bindingType: product.customizations?.bindingType[0] || "",
  }));

  const handleCustomizationChange = (field: keyof typeof selectedCustomization, value: string) => {
    setSelectedCustomization((prev) => ({ ...prev, [field]: value }));
  };

  // When the Add to Cart button is clicked, if the product has customization options, open the modal.
  const handleAddToCart = () => {
    if (product.customizations) {
      setShowCustomizationModal(true);
    } else {
      const priceToUse = product.discountedPrice < product.price ? product.discountedPrice : product.price;
      addToCart({
        id: product.id,
        name: product.name,
        price: priceToUse,
        quantity: 1,
        image: product.image,
      });
      router.push("/cart");
    }
  };

  // Confirm the customization selection and add the product to the cart.
  const confirmAddToCart = () => {
    const priceToUse = product.discountedPrice < product.price ? product.discountedPrice : product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price: priceToUse,
      quantity: 1,
      image: product.image,
      // If your CartItem type expects the key "customization" instead of "customizations",
      // then use "customization" here.
      customization: selectedCustomization,
    });
    setShowCustomizationModal(false);
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products">
        <Button variant="ghost">← Back to Products</Button>
      </Link>
      <div className="flex flex-col md:flex-row mt-8">
        <div className="md:w-1/2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          {product.status && (
            <div className="mb-2">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
                {product.status}
              </span>
            </div>
          )}
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <div className="mb-4">
            {product.discountedPrice < product.price ? (
              <>
                <span className="text-2xl font-bold">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-lg line-through text-muted-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
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
                  onChange={(e) => handleCustomizationChange("coverDesign", e.target.value)}
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
                  onChange={(e) => handleCustomizationChange("pageLayout", e.target.value)}
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
                  onChange={(e) => handleCustomizationChange("paperType", e.target.value)}
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
                  onChange={(e) => handleCustomizationChange("bindingType", e.target.value)}
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
              <Button variant="ghost" onClick={() => setShowCustomizationModal(false)}>
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
