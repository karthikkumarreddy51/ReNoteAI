"use client";
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
  // Find the product by matching id in a case-insensitive manner.
  const product = products.find((p) => p.id.toLowerCase() === id.toLowerCase());
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    return <div className="container mx-auto p-8">Product not found.</div>;
  }

  const handleAddToCart = () => {
    // Choose the discounted price if it is lower than the original price.
    const priceToUse = product.discountedPrice < product.price ? product.discountedPrice : product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price: priceToUse,
      quantity: 1,
      image: product.image,
    });
    // Navigate to the cart page after adding the item.
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
    </div>
  );
}
