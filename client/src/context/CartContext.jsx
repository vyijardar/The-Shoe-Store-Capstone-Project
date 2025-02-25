import React, { createContext, useState ,useContext,useEffect} from 'react';

export const CartContext = createContext();

export  const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage (for persistence)
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  // Save cart to local storage when updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If the item is new, add it to the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, total, totalItems, addToCart, updateItemQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}