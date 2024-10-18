"use client";

import CartIcon from "../../components/icons/CartIcon";
import { useCart } from "../../components/context/CartContext";
import CartGetItems from "../../components/pages/cart/CartGetItems";
import CartBuyItems from "../../components/pages/cart/CartBuyItems";

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
        <CartBuyItems
        totalAmount={totalAmount}
        />
      )}
    </section>
  );
};

export default Cart;
