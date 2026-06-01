import { Truck, RotateCcw, Lock, Headphones } from "lucide-react";

const InfoBar = () => (
  <section className="info-bar">
    <div className="info-container">
      <div className="info-item">
        <Truck size={24} />
        <span>Free Shipping on Orders $50+</span>
      </div>
      <div className="info-item">
        <RotateCcw size={24} />
        <span>30-Day Returns</span>
      </div>
      <div className="info-item">
        <Lock size={24} />
        <span>Secure Checkout</span>
      </div>
      <div className="info-item">
        <Headphones size={24} />
        <span>24/7 Support</span>
      </div>
    </div>
  </section>
);

export default InfoBar;