// Ensure react-hot-toast is installed: npm install react-hot-toast
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid3X3, List } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "react-hot-toast";

// Import images using next/image
import AirImg from "../../images/Air.png";
import ClassicImg from "../../images/classic.png";
import EcoImg from "../../images/eco.png";

interface Product {
  id: string;
  image?: string;
  name: string;
  discountedPrice: number;
  price: number;
  status?: string;
  customizations: {
    coverDesign: string[];
    pageLayout: string[];
    paperType: string[];
    bindingType: string[];
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onCustomize: () => void;
}

function ProductCard({ product, onAddToCart, onCustomize }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg">
      <Link href={`/products/${product.id}`}>
        {/* Image Section */}
        <div className="relative w-full h-80 overflow-hidden rounded-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
        {/* Text Section */}
        <h3 className="mt-4 text-lg font-semibold text-center">
          {product.name}
        </h3>
        <div className="mt-2 text-center">
          {product.discountedPrice < product.price ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl font-bold text-black">
                ₹{product.discountedPrice.toFixed(2)}
              </span>
              <span className="line-through text-sm text-muted-foreground">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-black">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </Link>
      {/* Buttons */}
      <div className="mt-4 flex space-x-2 justify-center">
        <Button onClick={onAddToCart}>Add to Cart</Button>
        <Button variant="outline" onClick={onCustomize}>
          Customize
        </Button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState("grid");
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(
    null
  );
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

  const products: Product[] = [
    {
      id: "air",
      name: "Air",
      image: AirImg.src,
      price: 2499,
      discountedPrice: 999,
      customizations: {
        coverDesign: ["Logo", "Text", "Images", "QR Code"],
        pageLayout: ["Lined", "Dot Grid", "Blank"],
        paperType: ["Recycled"],
        bindingType: ["Glue Bound", "Spiral Bound"],
      },
    },
    {
      id: "classic",
      name: "Renoteclassic",
      image: ClassicImg.src,
      price: 2499,
      discountedPrice: 999,
      customizations: {
        coverDesign: ["Logo", "Text", "Images"],
        pageLayout: ["Lined", "Dot Grid", "Blank"],
        paperType: ["Premium"],
        bindingType: ["Spiral Bound", "Glue Bound"],
      },
    },
    {
      id: "eco",
      name: "Eco",
      image: EcoImg.src,
      price: 999,
      discountedPrice: 499,
      customizations: {
        coverDesign: ["Logo", "Text", "Images", "QR Code"],
        pageLayout: ["Lined", "Dot Grid", "Blank"],
        paperType: ["Recycled"],
        bindingType: ["Glue Bound", "Spiral Bound"],
      },
    },
  ];

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
      addToCart({
        id: product.id,
        name: product.name,
        price:
          product.discountedPrice < product.price
            ? product.discountedPrice
            : product.price,
        quantity: 1,
        image: product.image,
      });
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

  const handleCustomize = (product: Product) => {
    setCustomizingProduct(product);
    setCustomizationSelections({
      coverDesign: product.customizations.coverDesign[0],
      pageLayout: product.customizations.pageLayout[0],
      paperType: product.customizations.paperType[0],
      bindingType: product.customizations.bindingType[0],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and view controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">ReNote AI</h1>
          <p className="text-muted-foreground">
            Discover our range of innovative, reusable smart notebooks with
            customizable options.
          </p>
        </div>
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
      </div>

      {/* Products Grid */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-8">
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid-cols-1 gap-4"
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onCustomize={() => handleCustomize(product)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="bestsellers" className="mt-8">
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid-cols-1 gap-4"
            }`}
          >
            {products
              .filter((product) => product.id === "classic")
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onCustomize={() => handleCustomize(product)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Customization Modal */}
      {customizingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Customize {customizingProduct.name}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Cover Design
                </label>
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
                  {customizingProduct.customizations.coverDesign.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Page Layout
                </label>
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
                  {customizingProduct.customizations.pageLayout.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Paper Type
                </label>
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
                  {customizingProduct.customizations.paperType.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Binding Type
                </label>
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
                  {customizingProduct.customizations.bindingType.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setCustomizingProduct(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: customizingProduct.id,
                      name: customizingProduct.name,
                      price:
                        customizingProduct.discountedPrice <
                        customizingProduct.price
                          ? customizingProduct.discountedPrice
                          : customizingProduct.price,
                      quantity: 1,
                      image: customizingProduct.image,
                      customization: customizationSelections,
                    });
                    setCustomizingProduct(null);
                    toast.success(`${customizingProduct.name} added to cart`, {
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
