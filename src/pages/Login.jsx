import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (login(email, password)) navigate('/');
  };

  return (
    <>
      <Helmet><title>Login - Shoplifter</title></Helmet>
      <div style={{maxWidth:400,margin:'80px auto',padding:30,background:'white',borderRadius:24,boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%',padding:12,marginBottom:15,borderRadius:8,border:'1px solid #d1d9e6'}} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:'100%',padding:12,marginBottom:15,borderRadius:8,border:'1px solid #d1d9e6'}} />
          <button type="submit" className="blue" style={{width:'100%',padding:14,borderRadius:40}}>Login</button>
        </form>
        <p style={{textAlign:'center',marginTop:15}}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </>
  );
};
export default Login;