import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // FakeStoreAPI returns all products as a plain array
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json(); // array, not an object with a 'products' key

        // Take only the first 12 products (or all if less)
        const limited = data.slice(0, 12);

        // Map to our expected shape
        const mappedProducts = limited.map((item) => ({
          id: item.id,
          name: item.title,                  // title -> name
          price: item.price,
          category: item.category,
          image: item.image,                 // single image
          description: item.description,
          rating: item.rating.rate,          // rating.rate
          reviews: item.rating.count,        // rating.count
          freeShipping: item.price > 50,
          inStock: true,                     // FakeStore doesn't provide stock
        }));

        setProducts(mappedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <Loader2 size={40} className="animate-spin" color="#6366f1" />
        <p style={{ marginTop: "1rem" }}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "red" }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section>
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>Our Products</h1>
      <div id="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;