import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <div className="app-container">
        <Component {...pageProps} />
      </div>
    </CartProvider>
  );
}

export default MyApp;
