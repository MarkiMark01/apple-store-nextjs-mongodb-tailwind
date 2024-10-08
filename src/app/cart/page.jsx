"use client";
import Image from "next/image";

import TrashIcon from "../../components/icons/TrashIcon";
import { useCart } from "../../components/context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce((acc, item) => {
    const totalItemPrice = Number(item.totalPrice) || 0;
    return acc + totalItemPrice;
  }, 0);

  return (
    <section className="max-w-6xl mx-auto min-h-screen p-4">
      {cart.length === 0 ? (
        <p className="text-xl font-bold mb-4 text-center">
          Your cart is empty...
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-6 shadow-lg bg-gray-50 flex items-center justify-between transition-transform duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="flex">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280}
                  height={180}
                  className="object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2 ml-6 mt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-lg font-medium">
                    Model: {item.model}
                  </p>
                  <p className="text-gray-500 text-lg font-medium">
                    Colour: {item.colour}
                  </p>
                  <p className="text-gray-500 text-lg font-medium">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-lg font-semibold mt-20 text-yellow-600">
                    Total Price: $
                    {(Number(item.totalPrice) || 0).toFixed(
                      0
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="border border-red-600 px-6 py-3 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4 text-right">
          <div
            className="text-xl font-bold text-yellow-500 
          bg-gray-700 p-2 rounded-lg shadow-lg text-center"
          >
            <span className="block text-white">
              Total Amount
            </span>
            <span className="text-2xl text-yellow-300">
              ${totalAmount.toFixed(0)}
            </span>
          </div>
          <div
            className="text-2xl font-bold bg-red-700 p-2 rounded-lg shadow-lg 
            text-center mt-2 cursor-pointer transition-transform duration-300 hover:scale-105" 
          >
            <span className="text-2xl text-white">
              Buy Now
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
