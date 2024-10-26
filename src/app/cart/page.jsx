"use client";
import { useEffect } from "react";
import { useCart } from "../../components/context/CartContext";
import CartGetItems from "../../components/pages/cart/CartGetItems";
import CartBuyItems from "../../components/pages/cart/CartBuyItems";
import CartEmptyItems from "../../components/pages/cart/CartEmptyItems";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  useEffect(() => {
    document.title = "AppleStore | Cart";
  }, []);

  const totalAmount = cart.reduce((acc, item) => {
    const totalItemPrice = Number(item.totalPrice) || 0;
    return acc + totalItemPrice;
  }, 0);

  return (
    <section className="max-w-6xl mx-auto min-h-screen p-4">
      {cart.length === 0 ? (
        <CartEmptyItems />
      ) : (
        <CartGetItems
          removeFromCart={removeFromCart}
          cart={cart}
        />
      )}
      {cart.length > 0 && (
        <CartBuyItems totalAmount={totalAmount} />
      )}
    </section>
  );
};

export default Cart;
