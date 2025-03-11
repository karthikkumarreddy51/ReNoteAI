import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { CartItem } from '@/utils/cart-storage';
import { formatPrice } from '@/utils/cart-storage';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative w-24 h-24">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        {item.customization && (
          <div className="text-sm text-gray-500">
            <p>Cover: {item.customization.coverDesign}</p>
            <p>Layout: {item.customization.pageLayout}</p>
            <p>Paper: {item.customization.paperType}</p>
            <p>Binding: {item.customization.bindingType}</p>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <select
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
            className="border rounded p-1"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
        <p className="text-sm text-gray-500">
          {item.quantity > 1 && `${formatPrice(item.price)} each`}
        </p>
      </div>
    </div>
  );
}
