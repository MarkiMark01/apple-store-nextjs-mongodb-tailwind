'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import ThanksModal from '../../components/modal/ThanksModal';
import { useCart } from "../../components/context/CartContext"; 

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clearCart } = useCart(); 
  const router = useRouter(); 

  const handlePayment = (e) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length !== 16 || !cardHolder || !expiryDate || !cvc) {
      setErrorMessage("Please fill in all fields and ensure the card number is exactly 16 characters long."); 
      return;
    }
    setErrorMessage("");

    console.log("Payment processed:", {
      cardNumber,
      cardHolder,
      expiryDate,
      cvc,
    });
    
    openModal();
    clearCart();
    router.push('/');
  };

  const handleToBack = () => {
    router.push('/cart');
  };

  const handleCardNumberBlur = () => {
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setErrorMessage("Card number must be exactly 16 characters long.");
    } else {
      setErrorMessage("");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvc("");
    }
  }, [isModalOpen]);

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-4">
      <button 
        type="button" 
        className="mb-4 font-bold text-xl"
        onClick={handleToBack}
      >
        Back
      </button>
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
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, ''); // Видалити пробіли
              if (value.length <= 16) {
                setCardNumber(value.replace(/(.{4})/g, '$1 ').trim()); // Додати пробіли кожні 4 символи
              }
            }}
            onBlur={handleCardNumberBlur} 
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
          className="bg-black hover:bg-blue-600 block text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Payment
        </button>
      </form>
      <ThanksModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default PaymentPage;

