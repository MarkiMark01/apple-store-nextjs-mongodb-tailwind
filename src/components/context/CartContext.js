"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/shopCart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (newCartItem) => {
    try {
      const res = await fetch('/api/shopCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCartItem),
      });

      if (!res.ok) {
        throw new Error('Failed to add item to cart');
      }

      const savedItem = await res.json();
      // console.log('Item added to cart:', savedItem);
      
      setCart((prevCart) => [...prevCart, savedItem]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    // console.log(`Removing item with ID: ${itemId}`);

    if (!itemId) {
      console.error('Item ID is undefined');
      return;
    }

    try {
      const res = await fetch(`/api/shopCart?id=${itemId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(`Failed to remove item from cart: ${errorMessage.error}`);
      }

      setCart((prevCart) => prevCart.filter(item => item._id !== itemId)); 
      console.log('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
