"use client";

import Link from "next/link";

import CartIcon from "../../components/icons/CartIcon";
import { useCart } from "../../components/context/CartContext";
import CartGetItems from "../../components/pages/cart/CartGetItems";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

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
        <CartGetItems 
        removeFromCart={removeFromCart}
        cart={cart}
        />
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
            className="text-2xl font-bold bg-red-700 p-2 rounded-lg shadow-lg text-center 
            mt-2 cursor-pointer transition-transform duration-300 hover:scale-105"
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
