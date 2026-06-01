import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name:'', address:'', city:'', zip:'', card:'', exp:'', cvv:'' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = e => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate('/'), 4000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return <div style={{maxWidth:600,margin:'40px auto',textAlign:'center'}}>Your cart is empty. <a href="/products">Shop now</a></div>;
  }

  return (
    <>
      <Helmet><title>Checkout - Shoplifter</title></Helmet>
      <div style={{maxWidth:800,margin:'40px auto',padding:'0 20px'}}>
        {orderPlaced ? (
          <div style={{textAlign:'center',padding:60,background:'#f0fdf4',borderRadius:24}}>
            <h1>🎉 Order Placed!</h1>
            <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
            <p>Redirecting to home...</p>
          </div>
        ) : (
          <>
            <h1>Checkout</h1>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:30}}>
              <form onSubmit={handleSubmit} style={{background:'white',padding:30,borderRadius:24,boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
                <h2>Shipping</h2>
                <input name="name" placeholder="Full Name" required onChange={handleChange} style={{width:'100%',padding:12,marginBottom:10,borderRadius:8,border:'1px solid #d1d9e6'}} />
                <input name="address" placeholder="Address" required onChange={handleChange} style={{width:'100%',padding:12,marginBottom:10,borderRadius:8,border:'1px solid #d1d9e6'}} />
                <input name="city" placeholder="City" required onChange={handleChange} style={{width:'100%',padding:12,marginBottom:10,borderRadius:8,border:'1px solid #d1d9e6'}} />
                <input name="zip" placeholder="ZIP Code" required onChange={handleChange} style={{width:'100%',padding:12,marginBottom:20,borderRadius:8,border:'1px solid #d1d9e6'}} />
                <h2>Payment</h2>
                <input name="card" placeholder="Card Number" required onChange={handleChange} style={{width:'100%',padding:12,marginBottom:10,borderRadius:8,border:'1px solid #d1d9e6'}} />
                <div style={{display:'flex',gap:10}}>
                  <input name="exp" placeholder="MM/YY" required onChange={handleChange} style={{flex:1,padding:12,borderRadius:8,border:'1px solid #d1d9e6'}} />
                  <input name="cvv" placeholder="CVV" required onChange={handleChange} style={{flex:1,padding:12,borderRadius:8,border:'1px solid #d1d9e6'}} />
                </div>
                <button type="submit" className="blue" style={{width:'100%',marginTop:20,padding:14,borderRadius:40}}>Place Order</button>
              </form>
              <div style={{background:'white',padding:30,borderRadius:24,boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
                <h2>Order Summary</h2>
                {cartItems.map(item => (
                  <div key={item.product.id} style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price*item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr/>
                <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',fontSize:'1.2rem'}}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Checkout;
