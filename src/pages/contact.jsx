import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What are your shipping times?",
    answer: "Orders typically ship within 1-2 business days. Delivery takes 3-7 days depending on your location."
  },
  {
    question: "How can I track my order?",
    answer: "Once shipped, you’ll receive an email with a tracking number. You can also check your order status in your account."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return window for unused items in original packaging. Refunds are processed within 5-7 days."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we only ship within Nigeria. International shipping is coming soon!"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", margin: "50px 0 40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#0f172a", fontWeight: 800, marginBottom: "10px" }}>
          Get in Touch
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Have a question or need help? We’re here for you 24/7.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
        {/* Left Column – Contact Form */}
        <div style={{ background: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px", color: "#0f172a" }}>Send us a Message</h2>
          {submitted ? (
            <div style={{ padding: "20px", background: "#f0fdf4", borderRadius: "12px", color: "#15803d", fontWeight: 500 }}>
              ✅ Thank you! Your message has been sent. We’ll reply shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 500 }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: "1px solid #d1d9e6", fontSize: "14px", outline: "none",
                    transition: "border 0.2s", background: "#f8fafc"
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 500 }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: "1px solid #d1d9e6", fontSize: "14px", outline: "none",
                    background: "#f8fafc"
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 500 }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: "1px solid #d1d9e6", fontSize: "14px", outline: "none",
                    background: "#f8fafc"
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 500 }}>Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: "1px solid #d1d9e6", fontSize: "14px", outline: "none",
                    resize: "vertical", background: "#f8fafc"
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%", padding: "14px", borderRadius: "40px",
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  color: "white", border: "none", fontWeight: 600, fontSize: "16px",
                  cursor: "pointer", transition: "transform 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                }}
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column – Info & Map */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Contact Info Cards */}
          <div style={{ background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#0f172a" }}>Contact Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={20} color="#6366f1" style={{ marginTop: "2px" }} />
                <div>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>Our Office</p>
                  <p style={{ color: "#475569", fontSize: "0.95rem" }}>
                    123 Commerce St, Suite 100<br />New York, NY 10001
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={20} color="#6366f1" />
                <div>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>Phone</p>
                  <p style={{ color: "#475569" }}>+1 (555) 123-4567</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail size={20} color="#6366f1" />
                <div>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>Email</p>
                  <p style={{ color: "#475569" }}>support@shoplifter.com</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Clock size={20} color="#6366f1" />
                <div>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>Working Hours</p>
                  <p style={{ color: "#475569" }}>
                    Mon – Fri: 9am – 8pm<br />Sat – Sun: 10am – 6pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)", height: "250px" }}>
            <iframe
              title="Shoplifter Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7648&layer=mapnik"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <HelpCircle size={32} color="#6366f1" style={{ marginBottom: "12px" }} />
          <h2 style={{ fontSize: "2rem", color: "#0f172a", fontWeight: 700 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "16px",
                marginBottom: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                overflow: "hidden"
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 24px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#0f172a",
                  textAlign: "left"
                }}
              >
                {faq.question}
                {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === index && (
                <div style={{ padding: "0 24px 18px", color: "#475569", lineHeight: 1.6 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;