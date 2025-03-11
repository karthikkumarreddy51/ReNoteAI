"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowRight, CreditCard, Minus, Plus } from "lucide-react";
import CartItem from "@/components/cart-item";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Add this helper function before your component return:
const getEffectivePrice = (item: { id: string; price: number }): number => {
  if (item.id === "eco") return 499;
  if (item.id === "air" || item.id === "classic") return 999;
  return item.price;
};

export default function CartPage() {
  const router = useRouter();
  const { items, updateItemQuantity, removeItem } = useCart();

  // Use the helper function when calculating subtotal:
  const subtotal = items.reduce(
    (total, item) => total + getEffectivePrice(item) * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <div key={`${item.id}-${JSON.stringify(item.customization)}`} 
                   className="flex items-center gap-4 border-b py-4">
                <div className="w-24 h-24 relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.customization && (
                    <div className="text-sm text-muted-foreground">
                      <p>Cover: {item.customization.coverDesign}</p>
                      <p>Layout: {item.customization.pageLayout}</p>
                      <p>Paper: {item.customization.paperType}</p>
                      <p>Binding: {item.customization.bindingType}</p>
                    </div>
                  )}
                  <p className="font-medium">₹{getEffectivePrice(item).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (item.quantity - 1 <= 0) {
                        removeItem(item.id);
                      } else {
                        updateItemQuantity(item.id, item.quantity - 1);
                      }
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
