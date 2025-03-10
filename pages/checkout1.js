import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;