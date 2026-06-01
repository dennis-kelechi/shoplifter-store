import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.find(p => p.id === action.payload.id);
      if (exists) {
        newState = state.filter(p => p.id !== action.payload.id);
        toast.error(`${action.payload.name} removed from wishlist`);
      } else {
        newState = [...state, action.payload];
        toast.success(`${action.payload.name} added to wishlist`);
      }
      break;
    }
    case 'REMOVE':
      newState = state.filter(p => p.id !== action.payload);
      toast.error('Removed from wishlist');
      break;
    default:
      return state;
  }
  localStorage.setItem('wishlist', JSON.stringify(newState));
  return newState;
};

const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    saved.forEach(item => dispatch({ type: 'TOGGLE', payload: item })); // fill state
    // Override initial empty array
  }, []);

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const isInWishlist = (id) => wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistProvider;