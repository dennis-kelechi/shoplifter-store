import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Loader2, Search, SlidersHorizontal, Tag } from "lucide-react";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Filters
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllProducts(
          data.products.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            category: item.category,
            image: item.thumbnail,
            description: item.description,
            rating: item.rating,
            reviews: item.stock,
            freeShipping: item.price > 50,
            inStock: item.stock > 0,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Unique categories from API
  const categories = ["all", ...new Set(allProducts.map((p) => p.category))];

  // Filter and sort logic
  let filtered = [...allProducts];

  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (freeShippingOnly) {
    filtered = filtered.filter((p) => p.freeShipping);
  }

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const visibleProducts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, search, sortBy, freeShippingOnly]);

  // ========== RENDER ==========
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <Loader2 size={40} className="animate-spin" color="#6366f1" />
        <p style={{ marginTop: "1rem" }}>Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "red" }}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
          borderRadius: "24px",
          padding: "60px 30px",
          marginTop: "40px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "12px" }}>
          Explore Our Collection
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "30px" }}>
          Handpicked just for you
        </p>
        <div
          style={{
            display: "flex",
            maxWidth: "500px",
            margin: "0 auto",
            background: "white",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 20px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            style={{
              background: "white",
              border: "none",
              padding: "0 20px",
              cursor: "pointer",
            }}
          >
            <Search size={20} color="#6366f1" />
          </button>
        </div>
      </section>

      {/* Category Tabs */}
      <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "40px",
              border: "none",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              textTransform: "capitalize",
              background: activeCategory === cat ? "#6366f1" : "#f1f5f9",
              color: activeCategory === cat ? "white" : "#334155",
              transition: "all 0.2s",
            }}
          >
            {cat === "all" ? "All Products" : cat}
            {cat !== "all" && <Tag size={14} style={{ marginLeft: 6, verticalAlign: "middle" }} />}
          </button>
        ))}
      </div>

      {/* Filters & Sort Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
          padding: "16px 20px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          gap: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <SlidersHorizontal size={20} color="#6366f1" />
          <span style={{ fontWeight: 500, color: "#0f172a" }}>Filters:</span>

          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={freeShippingOnly}
              onChange={(e) => setFreeShippingOnly(e.target.checked)}
              style={{ accentColor: "#6366f1", width: "16px", height: "16px" }}
            />
            Free Shipping
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: 500, color: "#0f172a" }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: "40px",
              border: "1px solid #d1d9e6",
              background: "white",
              fontWeight: 500,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <p style={{ marginTop: "20px", color: "#475569", fontWeight: 500 }}>
        Showing {visibleProducts.length} of {filtered.length} products
      </p>

      {/* Product Grid */}
      <div id="product-list" style={{ marginTop: "20px" }}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filtered.length && (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <button
            onClick={handleLoadMore}
            style={{
              padding: "14px 40px",
              borderRadius: "40px",
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              color: "white",
              border: "none",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Load More Products
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
          <p style={{ fontSize: "1.2rem" }}>No products match your filters. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default Products;