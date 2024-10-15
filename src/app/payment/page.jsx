// "use client";
// import React, { useState } from "react";

// import { useCart } from "../../components/context/CartContext";
// import Link from "next/link";

// const PaymentPage = () => {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolder, setCardHolder] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvc, setCvc] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const { clearCart } = useCart();

//   const handlePayment = (e) => {
//     e.preventDefault();
//     if (!cardNumber || !cardHolder || !expiryDate || !cvc) {
//       setErrorMessage("Please fill out all fields.");
//       return;
//     }
//     setErrorMessage("");
//     console.log("Payment processed:", {
//       cardNumber,
//       cardHolder,
//       expiryDate,
//       cvc,
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Card Payment
//       </h1>
//       <form
//         onSubmit={handlePayment}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//       >
//         {errorMessage && (
//           <p className="text-red-500">{errorMessage}</p>
//         )}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="cardNumber"
//           >
//             Card Number
//           </label>
//           <input
//             type="text"
//             id="cardNumber"
//             placeholder="0000 0000 0000 0000"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="cardHolder"
//           >
//             Cardholder Name
//           </label>
//           <input
//             type="text"
//             id="cardHolder"
//             placeholder="First Last Name"
//             value={cardHolder}
//             onChange={(e) => setCardHolder(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4 flex justify-between">
//           <div className="w-1/2 pr-2">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="expiryDate"
//             >
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               id="expiryDate"
//               placeholder="MM/YY"
//               value={expiryDate}
//               onChange={(e) =>
//                 setExpiryDate(e.target.value)
//               }
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="w-1/2 pl-2">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="cvc"
//             >
//               CVC
//             </label>
//             <input
//               type="text"
//               id="cvc"
//               placeholder="CVC"
//               value={cvc}
//               onChange={(e) => setCvc(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//         </div>
//         <Link
//           href={"/"}
//           type="submit"
//           onClick={clearCart}
//           className="bg-black1 hover:bg-blue-600 block text-center
//           text-white font-bold py-2 px-4 rounded focus:outline-none 
//           focus:shadow-outline"
//         >
//           Confirm Payment
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;



'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { useCart } from "../../components/context/CartContext"; 

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { clearCart } = useCart(); 
  const router = useRouter(); 

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiryDate || !cvc) {
      setErrorMessage("Please fill in all fields."); 
      return;
    }
    setErrorMessage("");
    
    console.log("Payment processed:", {
      cardNumber,
      cardHolder,
      expiryDate,
      cvc,
    });

    clearCart();

    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-4">
      <form
        onSubmit={handlePayment}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardHolder"
          >
            Card Holder
          </label>
          <input
            type="text"
            id="cardHolder"
            placeholder="Name Surname"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvc"
            >
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black1 hover:bg-blue-600 block text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
