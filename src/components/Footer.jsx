import { NavLink } from "react-router-dom";
import { ExternalLink, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="shoplifter-footer">
    <div className="footer-container">
      <div className="footer-col">
        <h4>Shoplifter</h4>
        <p>Your one-stop shop for the latest trends and essentials. Fast delivery, secure payments, and 24/7 support.</p>
        <div className="social-links">
          <a href="#"><ExternalLink size={18} /></a>
          <a href="#"><ExternalLink size={18} /></a>
          <a href="#"><ExternalLink size={18} /></a>
          <a href="#"><ExternalLink size={18} /></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Customer Service</h4>
        <ul>
          <li><NavLink to="/shipping">Shipping & Returns</NavLink></li>
          <li><NavLink to="/terms">Terms & Conditions</NavLink></li>
          <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
          <li><NavLink to="/size-guide">Size Guide</NavLink></li>
        </ul>
      </div>

      <div className="footer-col newsletter">
        <h4>Stay Updated</h4>
        <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
        <div className="contact-info">
          <p><Phone size={16} /> +1 (555) 123-4567</p>
          <p><Mail size={16} /> support@shoplifter.com</p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 Shoplifter. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;