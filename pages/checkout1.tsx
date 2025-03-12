import React from 'react';
import { useCart } from '@/context/cart-context';
// ...existing imports...

function Checkout() {
	// Replaced destructuring of 'cartItems' with 'cart' as provided by the context
	const { cart, clearCart, updateItemQuantity, removeItem } = useCart();

	// Function to update the quantity of an item in the cart
	const handleUpdate = (id: string, quantity: number) => {
		updateItemQuantity(id, quantity);
	};

	// Function to remove an item from the cart
	const handleRemove = (id: string) => {
		removeItem(id);
	};

	// Function to clear the cart
	const handleClearCart = () => {
		clearCart();
	};

	return (
		<div>
			<h1>Checkout</h1>
			{cart.length > 0 ? (
				<div>
					{cart.map(item => (
						<div key={item.id}>
							<p>{item.name} - Rs.{item.price}</p>
							<div>
								<button onClick={() => handleUpdate(item.id, item.quantity + 1)}>
									Increase
								</button>
								<button onClick={() => handleUpdate(item.id, item.quantity - 1)}>
									Decrease
								</button>
								<button onClick={() => handleRemove(item.id)}>
									Remove Item
								</button>
							</div>
						</div>
					))}
					<button onClick={handleClearCart}>Clear Cart</button>
				</div>
			) : (
				<p>Your cart is empty</p>
			)}
		</div>
	);
}

export default Checkout;