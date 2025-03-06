"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { ShoppingCart } from "lucide-react"

export default function AddToCartButton({ product, customization = {} }) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsLoading(true)

    // Prepare the product with customization
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      quantity: 1,
      image: product.image,
      customization: customization,
    }

    // Simulate API delay
    setTimeout(() => {
      addToCart(cartItem)

      toast({
        title: "Added to cart",
        description: "Your item has been added to your cart",
      })

      setIsLoading(false)
    }, 600)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading} className="flex-1">
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}

