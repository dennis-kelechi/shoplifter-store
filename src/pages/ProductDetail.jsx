import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, Star, Truck, RotateCcw, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SkeletonCard from '../components/SkeletonCard';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch main product from FakeStoreAPI
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();

        const mapped = {
          id: data.id,
          name: data.title,                // title -> name
          price: data.price,
          category: data.category,
          image: data.image,               // single image
          images: [data.image],            // gallery with one image
          description: data.description,
          rating: data.rating.rate,        // rating.rate
          reviews: data.rating.count,      // rating.count as number of reviews
          freeShipping: data.price > 50,
          inStock: true,                   // FakeStore doesn't have stock
        };
        setProduct(mapped);

        // Fetch related products from the same category
        const catRes = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}?limit=4`
        );
        const catData = await catRes.json();

        const relatedMapped = catData
          .filter(p => p.id != id)
          .map(p => ({
            id: p.id,
            name: p.title,
            price: p.price,
            category: p.category,
            image: p.image,
            description: p.description,
            rating: p.rating.rate,
            reviews: p.rating.count,
            freeShipping: p.price > 50,
            inStock: true,
          }));
        setRelated(relatedMapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div style={{maxWidth:1200,margin:'0 auto',padding:20}}><SkeletonCard /></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Helmet><title>{product.name} - Shoplifter</title></Helmet>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 20px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', marginTop:'40px'}}>
          <div>
            <img src={product.images[selectedImage]} alt={product.name} style={{width:'100%', borderRadius:'24px'}} />
            {product.images.length > 1 && (
              <div style={{display:'flex',gap:'10px',marginTop:'10px'}}>
                {product.images.map((img,i) => (
                  <img key={i} src={img} onClick={()=>setSelectedImage(i)}
                    style={{width:60,height:60,objectFit:'cover',borderRadius:'8px',cursor:'pointer',border: i===selectedImage?'2px solid #6366f1':'none'}} />
                ))}
              </div>
            )}
          </div>
          <div>
            <span className="chip">{product.category}</span>
            <h1 style={{fontSize:'2rem',margin:'10px 0'}}>{product.name}</h1>
            <div className="rating" style={{marginBottom:10}}>
              <span className="stars">⭐ {product.rating}</span>
              <span className="score">{product.rating}/5</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
            <p style={{fontSize:'2rem',fontWeight:700}}>${product.price.toFixed(2)}</p>
            <p style={{color:'#475569'}}>{product.description}</p>
            <div style={{display:'flex',gap:20,margin:'20px 0'}}>
              <span><Truck size={16} /> {product.freeShipping ? 'Free Shipping' : 'Shipping calculated'}</span>
              <span><RotateCcw size={16} /> 30-Day Returns</span>
            </div>
            <div style={{display:'flex',gap:12}}>
              <button className="blue" onClick={()=>addToCart(product)} style={{padding:'14px 30px'}}>
                <ShoppingCart size={18} style={{marginRight:8}} /> Add to Cart
              </button>
              <button className="pink" onClick={()=>toggleWishlist(product)} style={{padding:'14px 30px'}}>
                <Heart size={18} fill={isInWishlist(product.id)?'#6366f1':'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Summary (no individual reviews from FakeStoreAPI) */}
        <div style={{marginTop:60}}>
          <h2>Customer Reviews</h2>
          <div style={{background:'white',borderRadius:16,padding:20,marginTop:15,boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
            <p><strong>{product.rating} out of 5</strong> – based on {product.reviews} ratings</p>
          </div>
        </div>

        {/* Related */}
        {related.length>0 && (
          <div style={{marginTop:60}}>
            <h2>You might also like</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:24,marginTop:20}}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;