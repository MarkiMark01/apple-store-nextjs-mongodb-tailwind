// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// export default function ProductModal({
//   product,
//   isOpen,
//   onClose,
// }) {
//   const [quantity, setQuantity] = useState(1);
//   const maxQuantity = 10;

//   useEffect(() => {
//     if (isOpen) {
//       setQuantity(1);
//     }
//   }, [isOpen]);

//   if (!isOpen || !product) return null;

//   const increaseQuantity = () =>
//     setQuantity((prevQuantity) =>
//       prevQuantity < maxQuantity
//         ? prevQuantity + 1
//         : prevQuantity
//     );

//   const decreaseQuantity = () =>
//     setQuantity((prevQuantity) =>
//       prevQuantity > 1 ? prevQuantity - 1 : 1
//     );

//   const totalPrice = (product.price * quantity).toFixed(0);

//   const addToCart = () => {
//     console.log(
//       `Added ${quantity} ${product.title} to cart.`
//     );
//     setQuantity(1);
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur
//     flex items-center justify-center z-50 p-4"
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl
//       w-full h-auto overflow-hidden"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
//         >
//           X
//         </button>
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="flex items-center justify-center w-full lg:w-1/3">
//             <Image
//               src={product.image}
//               alt={product.title}
//               width={400}
//               height={300}
//               className="object-cover rounded-md"
//             />
//           </div>
//           <div className="w-full lg:w-2/3 mt-4">
//             <h2 className="text-xl sm:text-xl md:text-2xl xs:3xl font-bold mb-2">
//               {product.title} {product.model}
//             </h2>
//             <p className="text-lg mb-2 font-semibold">
//               Color: {product.colour}
//             </p>
//             <p className="text-gray-600 mb-4 font-semibold text-lg text-justify">
//               {product.description}
//             </p>
// <div className="flex flex-col lg:flex-row items-center justify-between">
//   <div className="flex items-center">
//     <button
//       onClick={decreaseQuantity}
//       className="border px-3 py-1 rounded-lg text-lg font-bold"
//     >
//       -
//     </button>
//     <span className="px-4 text-lg">
//       {quantity}
//     </span>
//     <button
//       onClick={increaseQuantity}
//       className="border px-3 py-1 rounded-lg text-lg font-bold"
//     >
//       +
//     </button>
//     <p className="text-2xl font-bold ml-6">
//       ${totalPrice}
//     </p>
//   </div>
//   <button
//     onClick={addToCart}
//     className="border px-4 py-2 font-semibold rounded-lg bg-black text-yellow-200
//      hover:bg-yellow-200 hover:text-black mt-4 lg:mt-0 lg:ml-4"
//   >
//     Add to cart
//   </button>
// </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      image: product.image,
      title: product.title,
      model: product.model,
      totalPrice: totalPrice,
      quantity: quantity,
    };
    addToCart(cartItem);
    onClose();
    router.push('/cart'); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
