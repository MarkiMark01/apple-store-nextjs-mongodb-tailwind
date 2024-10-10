"use client";
import Image from "next/image";
import { useCart } from "../../components/context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce((acc, item) => {
    const price = Number(item.totalPrice) || 0;
    return acc + price;
  }, 0);

  return (
    <section className="max-w-6xl mx-auto min-h-screen p-4">
      {cart.length === 0 ? (
        <p className="text-xl font-bold mb-4 text-center">
          Your cart is empty...
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-md flex 
              items-center justify-between"
            >
              <div className="flex">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="object-cover rounded-md mb-4"
                />
                <div
                  className="flex flex-col gap-1 mt-4"
                >
                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-lg font-semibold">
                    Model: {item.model}
                  </p>
                  <p className="text-gray-600 text-lg font-semibold">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-lg font-bold mt-36">
                    Total Price: $
                    {(Number(item.totalPrice) || 0).toFixed(
                      0
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-2 border px-4 py-2 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4 text-right">
          <h2 className="text-xl font-bold">
            Total Amount: ${totalAmount.toFixed(0)}
          </h2>
        </div>
      )}
    </section>
  );
};

export default Cart;
