"use client"

import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { cart, updateItemQuantity, removeItem } = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button className="mt-4" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={item.image || "/placeholder.svg?height=64&width=64"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">
                ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Shipping and taxes calculated at checkout</p>
            <div className="grid gap-2">
              <Button asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
