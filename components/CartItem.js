import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
// ...existing code...

const CartItem = ({ item }) => {
  const { incrementItem, decrementItem, removeItem } = useContext(CartContext);

  const handleDecrement = () => {
    if (item.quantity > 1) {
      decrementItem(item.id);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <div className="cart-item">
      {/* ...existing code... */}
      <button onClick={handleDecrement}>-</button>
      {/* ...existing code... */}
    </div>
  );
};
// ...existing code...
