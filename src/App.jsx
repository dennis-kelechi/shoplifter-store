import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import CartProvider from './context/CartContext';
import WishlistProvider from './context/WishlistContext';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Loading = () => <div style={{textAlign:'center',padding:'4rem'}}>Loading...</div>;

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Header />
                <ErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <AnimatePresence mode='wait'>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </AnimatePresence>
                  </Suspense>
                </ErrorBoundary>
                <Footer />
                <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;