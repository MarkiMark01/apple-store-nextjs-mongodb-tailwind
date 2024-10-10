// "use client";
// import Image from "next/image";
// import { useCart } from "../../components/context/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();

//   const totalAmount = cart.reduce((acc, item) => {
//     const price = Number(item.totalPrice) || 0;
//     return acc + price;
//   }, 0);

//   return (
//     <section className="max-w-6xl mx-auto min-h-screen p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cart.map((item) => (
//             <div key={item._id} className="border rounded-lg p-4 shadow-md flex flex-col">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={300}
//                 height={200}
//                 className="object-cover rounded-md mb-4"
//               />
//               <h2 className="text-xl font-semibold">{item.title}</h2>
//               <p className="text-gray-600">Model: {item.model}</p>
//               <p className="text-gray-600">Quantity: {item.quantity}</p>
//               <p className="text-lg font-bold mt-auto">
//                 Total Price: ${(Number(item.totalPrice) || 0).toFixed(0)} {/* Приведення до числа */}
//               </p>
//               <button
//                 onClick={() => removeFromCart(item._id)} // Ensure item._id is defined
//                 className="mt-2 border px-4 py-2 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       {cart.length > 0 && (
//         <div className="mt-4 text-right">
//           <h2 className="text-xl font-bold">
//             Total Amount: ${totalAmount.toFixed(0)}
//           </h2>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Cart;

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
      <h1 className="text-3xl font-bold mb-4 text-center">
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-md flex flex-col"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
                className="object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>
              <p className="text-gray-600">
                Model: {item.model}
              </p>
              <p className="text-gray-600">
                Quantity: {item.quantity}
              </p>
              <p className="text-lg font-bold mt-auto">
                Total Price: $
                {(Number(item.totalPrice) || 0).toFixed(0)}{" "}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                // onClick={() => {
                //   if (item._id) {
                //     removeFromCart(item._id);
                //   } else {
                //     console.error("Item ID is undefined");
                //   }
                // }}
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
