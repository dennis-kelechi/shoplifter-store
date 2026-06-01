import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
  <>
    <Helmet><title>404 - Shoplifter</title></Helmet>
    <div style={{textAlign:'center',padding:'100px 20px'}}>
      <h1 style={{fontSize:'5rem',color:'#6366f1'}}>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="hero-btn" style={{display:'inline-block',marginTop:20}}>Back to Home</Link>
    </div>
  </>
);
export default NotFound;