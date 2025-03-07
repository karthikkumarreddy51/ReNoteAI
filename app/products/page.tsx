"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, List } from "lucide-react";
import ProductCard from "@/components/product-card";
import { useCart } from "@/context/cart-context";

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
  customizations: {
    coverDesign: string[];
    pageLayout: string[];
    paperType: string[];
    bindingType: string[];
  };
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const { addToCart } = useCart();

  // State to control the customization modal
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [customizationSelections, setCustomizationSelections] = useState<{
    coverDesign: string;
    pageLayout: string;
    paperType: string;
    bindingType: string;
  }>({
    coverDesign: "",
    pageLayout: "",
    paperType: "",
    bindingType: "",
  });

  // Four products: Eco, Lite, Classic, Air Print
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
      description: "Innovative design featuring AI-powered functionalities and air printing capabilities.",
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

  // Function to open the customization modal with default values
  const handleAddToCart = (product: Product) => {
    if (product.customizations) {
      setCustomizingProduct(product);
      setCustomizationSelections({
        coverDesign: product.customizations.coverDesign[0],
        pageLayout: product.customizations.pageLayout[0],
        paperType: product.customizations.paperType[0],
        bindingType: product.customizations.bindingType[0],
      });
    } else {
      // Fallback if no customizations
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountedPrice < product.price ? product.discountedPrice : product.price,
        quantity: 1,
        image: product.image,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and view/sort controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Smart Notebooks</h1>
          <p className="text-muted-foreground">
            Discover our range of innovative, reusable smart notebooks with customizable options.
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          <div className="ml-2">
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid or List (without any sidebar filters or pagination) */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onCustomize={() => {
                setCustomizingProduct(product);
                setCustomizationSelections({
                  coverDesign: product.customizations.coverDesign[0],
                  pageLayout: product.customizations.pageLayout[0],
                  paperType: product.customizations.paperType[0],
                  bindingType: product.customizations.bindingType[0],
                });
              }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">
              <div className="sm:w-1/3 aspect-square relative">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                {product.status && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                    {product.status}
                  </div>
                )}
              </div>
              <div className="p-4 sm:w-2/3 flex flex-col">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-2">{product.description}</p>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {product.discountedPrice < product.price ? (
                    <>
                      <span className="font-bold text-lg">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex gap-2">
                  <Button asChild>
                    <Link href={`/products/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/products/${product.id}/customize`}>
                      Customize
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customization Modal */}
      {customizingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Customize {customizingProduct.name}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cover Design</label>
                <select
                  value={customizationSelections.coverDesign}
                  onChange={(e) =>
                    setCustomizationSelections({
                      ...customizationSelections,
                      coverDesign: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                >
                  {customizingProduct.customizations.coverDesign.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Page Layout</label>
                <select
                  value={customizationSelections.pageLayout}
                  onChange={(e) =>
                    setCustomizationSelections({
                      ...customizationSelections,
                      pageLayout: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                >
                  {customizingProduct.customizations.pageLayout.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Paper Type</label>
                <select
                  value={customizationSelections.paperType}
                  onChange={(e) =>
                    setCustomizationSelections({
                      ...customizationSelections,
                      paperType: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                >
                  {customizingProduct.customizations.paperType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Binding Type</label>
                <select
                  value={customizationSelections.bindingType}
                  onChange={(e) =>
                    setCustomizationSelections({
                      ...customizationSelections,
                      bindingType: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                >
                  {customizingProduct.customizations.bindingType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" onClick={() => setCustomizingProduct(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: customizingProduct.id,
                      name: customizingProduct.name,
                      price:
                        customizingProduct.discountedPrice < customizingProduct.price
                          ? customizingProduct.discountedPrice
                          : customizingProduct.price,
                      quantity: 1,
                      image: customizingProduct.image,
                      customization: customizationSelections,
                    });
                    setCustomizingProduct(null);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
