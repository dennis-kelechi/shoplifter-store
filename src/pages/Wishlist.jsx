import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <Helmet><title>Wishlist - Shoplifter</title></Helmet>
      <div style={{maxWidth:800,margin:'40px auto',padding:'0 20px'}}>
        <h1>My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div style={{textAlign:'center',padding:60}}>
            <Heart size={48} color="#94a3b8" />
            <p>Your wishlist is empty</p>
            <Link to="/products" className="hero-btn" style={{display:'inline-block',marginTop:20}}>Discover Products</Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:20,marginTop:20}}>
            {wishlist.map(product => (
              <div key={product.id} className="life" style={{position:'relative'}}>
                <button onClick={() => removeFromWishlist(product.id)} style={{position:'absolute',top:10,right:10,background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={18} /></button>
                <img src={product.image} alt={product.name} style={{height:180,width:'100%',objectFit:'contain',borderRadius:12}} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button className="blue" onClick={() => addToCart(product)} style={{width:'100%',marginTop:10}}><ShoppingCart size={16} style={{marginRight:6}} /> Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Wishlist;