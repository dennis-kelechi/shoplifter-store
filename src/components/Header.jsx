import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="shoplifter-header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <ShoppingBag size={28} />
            <span className="logo-text">Shoplifter</span>
          </NavLink>
        </div>

        <div className="search-bar desktop-search">
          <input type="text" placeholder="Search for products..." />
          <button type="submit"><Search size={18} /></button>
        </div>

        <div className="header-icons desktop-icons">
          <NavLink to="/account" className="icon-link" aria-label="Account">
            <User size={20} />
            <span className="icon-label">Account</span>
          </NavLink>
          <NavLink to="/wishlist" className="icon-link" aria-label="Wishlist">
            <Heart size={20} />
            <span className="icon-label">Wishlist</span>
          </NavLink>
          <NavLink to="/cart" className="icon-link cart-icon" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="cart-count">3</span>
            <span className="icon-label">Cart</span>
          </NavLink>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="search-bar mobile-search">
        <input type="text" placeholder="Search for products..." />
        <button type="submit"><Search size={18} /></button>
      </div>

      <nav className={`main-nav ${menuOpen ? "active" : ""}`}>
        <ul className="nav-menu">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li
            className={`dropdown ${dropdownOpen ? "active" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <NavLink to="#" onClick={(e) => e.preventDefault()}>
              Categories <ChevronDown size={16} style={{ marginLeft: 4 }} />
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>All Products</NavLink></li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Electronics</NavLink></li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Fashion</NavLink></li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Home & Living</NavLink></li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Beauty</NavLink></li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Sports</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/deals" onClick={() => setMenuOpen(false)}>Deals</NavLink></li>
          <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>New Arrivals</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;