"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

const ProductModal = ({ product, isOpen, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter(); 

  if (!isOpen || !product) return null;

  const productPrice = product.price || 0; 
  const totalPrice = (productPrice * quantity).toFixed(0); 

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      image: product.image,
      title: product.title,
      model: product.model,
      colour: product.colour,
      price: product.price,
      totalPrice: totalPrice,
      quantity: quantity,
    };

    console.log("Quantity:", quantity);  
    addToCart(cartItem, quantity);
    onClose();
    router.push('/cart'); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
        >
          X
        </button>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={300}
          className="object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-lg">{product.description}</p>
        <p className="text-lg font-bold mt-4">Price: ${productPrice}</p>

        <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
          <div className="flex items-center">
            <button
              onClick={decreaseQuantity}
              className="border px-3 py-1 rounded-lg text-lg font-bold"
            >
              -
            </button>
            <span className="px-4 text-lg">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="border px-3 py-1 rounded-lg text-lg font-bold"
            >
              +
            </button>
            <p className="text-2xl font-bold ml-6">${totalPrice}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="border px-4 py-2 font-semibold rounded-lg bg-black text-yellow-200 hover:bg-yellow-200 hover:text-black mt-4 lg:mt-0 lg:ml-4"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;



