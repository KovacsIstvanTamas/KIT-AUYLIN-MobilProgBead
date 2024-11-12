import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Kosárba adás
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Ellenőrizze, hogy a termék már benne van-e a kosárban
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex > -1) {
        // Ha benne van, növeli a mennyiséget
        const updatedCart = [...prevItems];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      }
      // Ha nem, hozzáadja a kosárhoz
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Kosárban lévő termékek összesített ára
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Kosárból törlés
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
