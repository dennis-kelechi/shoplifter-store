import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.product.id === action.payload.product.id);
      if (existing) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = { ...state, items: [...state.items, { product: action.payload.product, quantity: 1 }] };
      }
      toast.success(`${action.payload.product.name} added to cart`);
      break;
    }
    case 'REMOVE_ITEM':
      newState = { ...state, items: state.items.filter(item => item.product.id !== action.payload) };
      toast.error('Item removed from cart');
      break;
    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      break;
    case 'CLEAR_CART':
      newState = { ...state, items: [] };
      break;
    default:
      return state;
  }
  localStorage.setItem('cart', JSON.stringify(newState.items));
  return newState;
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'INIT', payload: saved });
    // Override initial state
    state.items = saved;
  }, []);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: { product } });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cartItems: state.items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;