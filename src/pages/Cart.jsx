import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <Helmet><title>Cart - Shoplifter</title></Helmet>
      <div style={{maxWidth:800,margin:'40px auto',padding:'0 20px'}}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div style={{textAlign:'center',padding:60}}>
            <ShoppingBag size={48} color="#94a3b8" />
            <p>Your cart is empty</p>
            <Link to="/products" className="hero-btn" style={{display:'inline-block',marginTop:20}}>Shop Now</Link>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.product.id} style={{display:'flex',alignItems:'center',gap:20,background:'white',borderRadius:16,padding:20,marginBottom:15,boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
                <img src={item.product.image} alt={item.product.name} style={{width:80,height:80,objectFit:'contain',borderRadius:12}} />
                <div style={{flex:1}}>
                  <h3>{item.product.name}</h3>
                  <p style={{color:'#475569'}}>${item.product.price.toFixed(2)}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="pink" style={{padding:8}}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="blue" style={{padding:8}}><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={18} /></button>
              </div>
            ))}
            <div style={{textAlign:'right',margin:'20px 0'}}>
              <h2>Total: ${total.toFixed(2)}</h2>
              <Link to="/checkout" className="blue" style={{display:'inline-block',padding:'14px 40px',borderRadius:40,textDecoration:'none',marginTop:10}}>Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;