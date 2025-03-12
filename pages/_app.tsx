import '../app/globals.css';
import { CartProvider } from '@/context/cart-context';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
