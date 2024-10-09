import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductModal({
  product,
  isOpen,
  onClose,
}) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const increaseQuantity = () =>
    setQuantity((prevQuantity) =>
      prevQuantity < maxQuantity
        ? prevQuantity + 1
        : prevQuantity
    );

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );

  const addToCart = () => {
    console.log(
      `Added ${quantity} ${product.title} to cart.`
    );
    setQuantity(1);
    onClose();
  };

  const totalPrice = (product.price * quantity).toFixed(0);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur 
    flex items-center justify-center z-50 p-4"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl 
      w-full h-auto overflow-hidden"
      >
        
      </div>
    </div>
  );
}
