"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { ShoppingCart } from "lucide-react"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customization?: object;
}

export default function AddToCartButton({ product, customization = {} }: { product: Product; customization?: object }) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const handleAddToCart = () => {
    setIsLoading(true)

    const cartItem: CartItem = {  // Added type annotation
      id: String(product.id),  // Convert to string if needed
      name: product.name,
      price: product.discountedPrice || product.price,
      quantity: 1,
      image: product.image,
      customization: customization,
    }

    // Simulate API delay
    setTimeout(() => {
      addToCart(cartItem)
      setIsAdded(true)
      setIsLoading(false)
      toast({
        title: "Added to cart",
        description: "Your item has been added to your cart",
      })
    }, 600)
  }

  const handleViewCart = () => {
    router.push('/cart')
  }

  if (isAdded) {
    return (
      <Button onClick={handleViewCart} className="flex-1 bg-green-600 hover:bg-green-700">
        <ShoppingCart className="h-4 w-4 mr-2" />
        View Cart
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading} className="flex-1">
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}

