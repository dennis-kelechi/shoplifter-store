import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Truck, RotateCcw, Lock, Headphones, Sparkles, Star,
  ChevronLeft, ChevronRight, ShoppingBag, Zap, Camera,
  Quote, ArrowRight, Clock, Gift, Heart
} from "lucide-react";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format" },
  { name: "Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format" },
  { name: "Home & Living", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=200&auto=format" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=200&auto=format" },
  { name: "Groceries", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format" },
];

const testimonials = [
  {
    id: 1,
    text: "Shoplifter made my shopping so easy! Fast delivery and amazing quality.",
    author: "Sarah J.",
    role: "Verified Buyer",
    avatar: "👩",
  },
  {
    id: 2,
    text: "The best customer support I've ever experienced. Highly recommended!",
    author: "Michael R.",
    role: "Loyal Customer",
    avatar: "👨",
  },
  {
    id: 3,
    text: "I love their trendy collections. It's my go-to online store.",
    author: "Emily K.",
    role: "Fashion Enthusiast",
    avatar: "👩‍🦰",
  },
  {
    id: 4,
    text: "Secure checkout and great deals. I'm a fan for life.",
    author: "David L.",
    role: "Verified Buyer",
    avatar: "👨‍🦱",
  },
];

const instaPosts = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&auto=format",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format",
  "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=300&auto=format",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format",
];

const Home = () => {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const target = new Date();
    target.setHours(23, 59, 59, 999); // End of today
    const difference = target - new Date();
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Trending products state
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=4")
      .then((res) => res.json())
      .then((data) =>
        setTrending(
          data.products.map((p) => ({
            id: p.id,
            name: p.title,
            price: p.price,
            category: p.category,
            image: p.thumbnail,
            description: p.description,
            rating: p.rating,
            reviews: p.stock,
            freeShipping: p.price > 50,
            inStock: p.stock > 0,
          }))
        )
      );
  }, []);

  // Testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const touchStartX = useRef(0);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextTestimonial();
    if (diff < -50) prevTestimonial();
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ===== HERO WITH ANIMATED BACKGROUND ===== */}
      <section
        className="gradient-animate"
        style={{
          background: "linear-gradient(-45deg, #6366f1, #a855f7, #c084fc, #6366f1)",
          backgroundSize: "200% 200%",
          color: "white",
          padding: "120px 20px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating circles */}
        <div
          className="floating-circle"
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="floating-circle"
          style={{
            position: "absolute",
            bottom: "15%",
            right: "8%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            animationDelay: "2s",
            filter: "blur(3px)",
          }}
        />
        <div
          className="floating-circle"
          style={{
            position: "absolute",
            top: "40%",
            right: "20%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            animationDelay: "4s",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Sparkles size={36} color="#fbbf24" style={{ marginRight: "12px" }} />
            <h1 style={{ fontSize: "3.5rem", fontWeight: 800, margin: 0 }}>
              Elevate Your Style
            </h1>
            <Sparkles size={36} color="#fbbf24" style={{ marginLeft: "12px" }} />
          </div>
          <p style={{ fontSize: "1.3rem", opacity: 0.95, marginBottom: "30px" }}>
            Discover exclusive drops, lightning deals, and fast delivery.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/products"
              className="pulse-animation"
              style={{
                padding: "16px 36px",
                background: "white",
                color: "#6366f1",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "18px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <ShoppingBag size={20} />
              Shop Now
            </Link>
            <Link
              to="/products"
              style={{
                padding: "16px 36px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                color: "white",
                borderRadius: "50px",
                fontWeight: 600,
                fontSize: "18px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INFO BAR ===== */}
      <section className="info-bar">
        <div className="info-container">
          <div className="info-item"><Truck size={24} /><span>Free Shipping $50+</span></div>
          <div className="info-item"><RotateCcw size={24} /><span>30-Day Returns</span></div>
          <div className="info-item"><Lock size={24} /><span>Secure Checkout</span></div>
          <div className="info-item"><Headphones size={24} /><span>24/7 Support</span></div>
        </div>
      </section>

      {/* ===== FLASH SALE COUNTDOWN ===== */}
      <section style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 20px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
            borderRadius: "24px",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Zap size={28} color="#92400e" />
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#92400e", margin: 0 }}>
                Flash Sale!
              </h2>
            </div>
            <p style={{ color: "#78350f", fontWeight: 500 }}>
              Up to 50% off – ends in:
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  textAlign: "center",
                  minWidth: "70px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
                  {String(value).padStart(2, "0")}
                </span>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", textTransform: "capitalize" }}>
                  {unit}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/products"
            style={{
              padding: "14px 30px",
              background: "#dc2626",
              color: "white",
              borderRadius: "40px",
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Gift size={18} /> Grab the Deal
          </Link>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <Link to="/products" className="category-card" key={idx}>
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TRENDING PRODUCTS ===== */}
      <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a" }}>
              <Star size={28} color="#fbbf24" style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Trending Now
            </h2>
            <p style={{ color: "#64748b" }}>Most loved by our community</p>
          </div>
          <Link
            to="/products"
            style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section style={{ background: "#f8fafc", padding: "80px 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <Quote size={40} color="#6366f1" style={{ marginBottom: "20px" }} />
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "40px", color: "#0f172a" }}>
            What Our Customers Say
          </h2>
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                display: "flex",
                transform: `translateX(-${currentTestimonial * 100}%)`,
                transition: "transform 0.4s ease",
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  style={{
                    flex: "0 0 100%",
                    padding: "30px",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: "24px",
                      padding: "40px",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{t.avatar}</div>
                    <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#334155", marginBottom: "20px" }}>
                      "{t.text}"
                    </p>
                    <h4 style={{ color: "#0f172a" }}>{t.author}</h4>
                    <p style={{ color: "#64748b", fontSize: "0.9rem" }}>{t.role}</p>
                    <div style={{ marginTop: "16px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" style={{ margin: "0 2px" }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Arrows */}
            <button
              onClick={prevTestimonial}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          {/* Dots */}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "8px" }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: idx === currentTestimonial ? "#6366f1" : "#cbd5e1",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section
        className="gradient-animate"
        style={{
          background: "linear-gradient(-45deg, #a855f7, #6366f1, #c084fc, #6366f1)",
          backgroundSize: "200% 200%",
          color: "white",
          textAlign: "center",
          padding: "80px 20px",
          margin: "60px 0",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Clock size={36} style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "20px" }}>
            Don't Miss Out!
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
            Join 10,000+ happy shoppers and get exclusive access to deals and new arrivals.
          </p>
          <Link
            to="/products"
            style={{
              padding: "16px 40px",
              background: "white",
              color: "#6366f1",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "18px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Explore Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ===== INSTAGRAM FEED ===== */}
      <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Camera size={32} color="#6366f1" />
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a" }}>Follow Us @shoplifter</h2>
          <p style={{ color: "#64748b" }}>Tag your style with #ShoplifterFinds</p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
          }}
        >
          {instaPosts.map((src, idx) => (
            <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1/1", position: "relative", group: "" }}>
              <img
                src={src}
                alt="Instagram"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              >
                <Heart size={28} color="white" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;