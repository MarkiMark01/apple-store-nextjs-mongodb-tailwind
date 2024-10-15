"use client";
import Image from "next/image";
import Link from "next/link";

import TrashIcon from "../../components/icons/TrashIcon";
import CartIcon from "../../components/icons/CartIcon";
import { useCart } from "../../components/context/CartContext";

const Cart = () => {
  const { cart, removeFromCart} = useCart();

  const totalAmount = cart.reduce((acc, item) => {
    const totalItemPrice = Number(item.totalPrice) || 0;
    return acc + totalItemPrice;
  }, 0);

  return (
    <section className="max-w-6xl mx-auto min-h-screen p-4">
      {cart.length === 0 ? (
        <div className="text-xl font-bold flex items-center justify-center min-h-screen gap-4">
          <p className="text-2xl font-semibold">
            Your cart is empty...
          </p>
          <CartIcon />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-6 shadow-lg bg-gray-50 flex flex-col lg:flex-row items-center justify-between transition-transform duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280}
                  height={180}
                  className="object-cover rounded-lg mb-4 lg:mb-0"
                />
                <div className="flex flex-col gap-2 lg:ml-6 lg:mt-4 text-center lg:text-left">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
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
                  <p className="text-lg font-semibold mt-4 lg:mt-20 text-yellow-600">
                    Total Price: $
                    {Number(item.totalPrice).toFixed(0)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="flex justify-center items-center border border-red-600 px-4 py-2 text-sm text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300 w-full lg:w-auto mt-4 lg:mt-0 lg:px-6 lg:py-3 lg:text-base"
              >
                <TrashIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4 text-right">
          <div className="text-xl font-bold text-yellow-500 bg-gray-700 p-2 rounded-lg shadow-lg text-center">
            <span className="block text-white">
              Total Amount
            </span>
            <span className="text-2xl text-yellow-300">
              ${totalAmount.toFixed(0)}
            </span>
          </div>
          <div
            className="text-2xl font-bold bg-red-700 p-2 rounded-lg shadow-lg text-center mt-2 cursor-pointer transition-transform duration-300 hover:scale-105"
            // onClick={clearCart}
          >
            <Link
              href={"/payment"}
              className="text-2xl text-white block p-2 rounded-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
