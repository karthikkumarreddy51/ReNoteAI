"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import AddToCartButton from "@/components/add-to-cart-button";

// Define a TypeScript interface for the product object
interface Product {
  id: string | number;
  image?: string;
  name: string;
  status?: string;
  description: string;
  rating: number;
  reviewCount: number;
  discountedPrice: number;
  price: number;
}

// Update the props type to include an optional onCustomize callback.
interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onCustomize?: () => void;
}

export default function ProductCard({ product, onAddToCart, onCustomize }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        {product.status && (
          <Badge className="absolute top-2 left-2">{product.status}</Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center">
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
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {onAddToCart ? (
          <>
            <Button onClick={onAddToCart}>Add to Cart</Button>
            {onCustomize && (
              <Button variant="outline" onClick={onCustomize} className="ml-2">
                Customize
              </Button>
            )}
          </>
        ) : (
          <>
            <AddToCartButton product={product} />
            {onCustomize && (
              <Button variant="outline" onClick={onCustomize} className="ml-2">
                Customize
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
