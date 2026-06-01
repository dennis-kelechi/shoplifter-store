const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format" },
  { name: "Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format" },
  { name: "Home & Living", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=200&auto=format" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=200&auto=format" },
  { name: "Groceries", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format" },
];

const FeaturedCategories = () => (
  <section className="featured-categories">
    <h2>Shop by Category</h2>
    <div className="category-grid">
      {categories.map((cat, idx) => (
        <a href="#" className="category-card" key={idx}>
          <img src={cat.img} alt={cat.name} />
          <h3>{cat.name}</h3>
        </a>
      ))}
    </div>
  </section>
);

export default FeaturedCategories;