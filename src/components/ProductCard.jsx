import { Link } from 'react-router-dom';
import { Truck, CheckCircle, XCircle, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { id, name, price, category, image, description, rating, reviews, freeShipping, inStock } = product;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <motion.div
      className="life"
      whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/products/${id}`} style={{textDecoration:'none',color:'inherit'}}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>
      <span className="chip">{category}</span>
      <p className="bing">{description}</p>
      <div className="rating">
        <span className="stars">⭐ {rating}</span>
        <span className="score">{rating}/5</span>
        <span className="reviews">({reviews} reviews)</span>
      </div>
      <div className="meta">
        {freeShipping && <span className="meta-item"><Truck size={14} /> Free Shipping</span>}
        <span className="meta-item">
          {inStock ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <div className="price">${price.toFixed(2)}</div>
      <div className="button-group">
        <button className="blue" onClick={() => addToCart(product)}>
          <ShoppingCart size={16} style={{marginRight:4}} /> Add
        </button>
        <button className="pink" onClick={() => toggleWishlist(product)}>
          <Heart size={16} fill={isInWishlist(id) ? '#6366f1' : 'none'} color={isInWishlist(id) ? '#6366f1' : 'currentColor'} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;