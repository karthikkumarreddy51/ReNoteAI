import { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose, onViewCart, onCheckout }) => {
  const { cartItems, incrementItem, decrementItem, removeItem } = useContext(CartContext);
  const router = useRouter();

  const handleViewCart = () => {
    onClose();
    onViewCart();
    router.push('/cart'); // Navigate to the cart page
  };

  const handleCheckout = () => {
    onClose();
    onCheckout();
    router.push('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      {cartItems.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => decrementItem(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => incrementItem(item.id)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={handleViewCart}>View Cart</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};
