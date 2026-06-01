import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user'));
    if (saved) setUser(saved);
  }, []);

  const login = (email, password) => {
    // Mock – just accept any non‑empty
    const fakeUser = { email, name: email.split('@')[0] };
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return true;
  };

  const register = (name, email, password) => {
    const fakeUser = { email, name };
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;