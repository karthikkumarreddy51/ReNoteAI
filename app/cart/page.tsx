"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowRight, CreditCard } from "lucide-react";
import CartItem from "@/components/cart-item";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-3">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="font-medium">Product</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Price</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Quantity</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="font-medium">Total</h3>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Discount code" />
                  <Button variant="outline">Apply</Button>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Razorpay
                </p>

                <div className="flex justify-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
