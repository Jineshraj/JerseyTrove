/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const incomingId = product._id || product.id;
      const existing = prev.find(
        (item) => (item._id || item.id) === incomingId,
      );
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === incomingId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item,
        );
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          (item._id || item.id) === id
            ? { ...item, qty: Math.max(0, (item.qty || 1) + delta) }
            : item,
        )
        .filter((item) => (item.qty || 0) > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => (item._id || item.id) !== id),
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart should be used inside CartContext Provider");
  }
  return context;
};
