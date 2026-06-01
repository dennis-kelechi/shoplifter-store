import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Search, User, Heart, ShoppingCart, Menu, ChevronDown,
  Sun, Moon, LogOut, UserCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) navigate(`/products?search=${query}`);
  };

  return (
    <header className="shoplifter-header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <ShoppingBag size={28} />
            <span className="logo-text">Shoplifter</span>
          </NavLink>
        </div>

        <form className="search-bar desktop-search" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search for products..." aria-label="Search" />
          <button type="submit"><Search size={18} /></button>
        </form>

        <div className="header-icons desktop-icons">
          <button onClick={toggleTheme} className="icon-link" aria-label="Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="icon-label">Theme</span>
          </button>

          {user ? (
            <div style={{position:'relative'}}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="icon-link">
                <UserCircle size={20} />
                <span className="icon-label">{user.name}</span>
              </button>
              {userMenuOpen && (
                <div style={{position:'absolute',right:0,top:'100%',background:'white',borderRadius:12,boxShadow:'0 10px 30px rgba(0,0,0,0.2)',padding:10,zIndex:10}}>
                  <button onClick={logout} style={{display:'flex',alignItems:'center',gap:8,background:'none',border:'none',color:'#334155',cursor:'pointer'}}><LogOut size={16} /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="icon-link" aria-label="Account">
              <User size={20} />
              <span className="icon-label">Account</span>
            </NavLink>
          )}

          <NavLink to="/wishlist" className="icon-link" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}
            <span className="icon-label">Wishlist</span>
          </NavLink>
          <NavLink to="/cart" className="icon-link cart-icon" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            <span className="icon-label">Cart</span>
          </NavLink>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="search-bar mobile-search">
        <form onSubmit={handleSearch} style={{display:'flex',width:'100%'}}>
          <input type="text" name="search" placeholder="Search for products..." />
          <button type="submit"><Search size={18} /></button>
        </form>
      </div>

      <nav className={`main-nav ${menuOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="nav-menu">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li className={`dropdown ${dropdownOpen ? "active" : ""}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span style={{cursor:'pointer',display:'flex',alignItems:'center'}}>
              Categories <ChevronDown size={16} style={{marginLeft:4}} />
            </span>
            <ul className="dropdown-menu">
              <li><NavLink to="/products?category=electronics" onClick={() => setMenuOpen(false)}>Electronics</NavLink></li>
              <li><NavLink to="/products?category=fashion" onClick={() => setMenuOpen(false)}>Fashion</NavLink></li>
              <li><NavLink to="/products?category=home-decoration" onClick={() => setMenuOpen(false)}>Home & Living</NavLink></li>
              <li><NavLink to="/products?category=beauty" onClick={() => setMenuOpen(false)}>Beauty</NavLink></li>
              <li><NavLink to="/products?category=sports" onClick={() => setMenuOpen(false)}>Sports</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Deals</NavLink></li>
          <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>New Arrivals</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;