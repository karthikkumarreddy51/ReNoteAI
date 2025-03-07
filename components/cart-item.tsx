"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil } from "lucide-react";
import { useCart, CartItem as CartItemType } from "@/context/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
              {item.name}
            </Link>
            {item.customization && (
              <div className="mt-1 text-xs text-muted-foreground">
                <p>Color: {item.customization.coverColor}</p>
                <p>Layout: {item.customization.pageLayout}</p>
                <p>Paper: {item.customization.paperType}</p>
                <p>Binding: {item.customization.bindingType}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 text-center">
          <span>${item.price.toFixed(2)}</span>
        </div>

        <div className="col-span-2 flex items-center justify-center">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementQuantity}>
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
              +
            </Button>
          </div>
        </div>

        <div className="col-span-2 text-right">
          <span className="font-medium">${(item.price * quantity).toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="ghost" size="sm" className="h-8">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-destructive hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
