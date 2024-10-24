"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PaymentCardNumber from "../../components/pages/payment/PaymentCardNumber";
import PaymentCardHolder from "../../components/pages/payment/PaymentCardHolder";
import PaymentExpiryDate from "../../components/pages/payment/PaymentEmpiryDate";
import ThanksModal from "../../components/modal/ThanksModal";
import { useCart } from "../../components/context/CartContext";
import { useModal } from "../../components/hooks/useModal"; 

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { clearCart } = useCart();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal(); 

  const validatePaymentDetails = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      return "Card number must be exactly 16 characters long.";
    }
    if (!cardHolder) {
      return "Card holder name is required.";
    }
    if (!expiryDate) {
      return "Expiry date is required.";
    }
    if (!cvc) {
      return "CVC is required.";
    }
    return "";
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const error = validatePaymentDetails();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");
    openModal();
    clearCart();
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleToBack = () => {
    router.push("/cart");
  };

  useEffect(() => {
    if (isOpen) {
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvc("");
      setErrorMessage("");
    }
  }, [isOpen]);

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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
        <PaymentCardNumber
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
        />

        <PaymentCardHolder
          cardHolder={cardHolder}
          setCardHolder={setCardHolder}
        />

        <PaymentExpiryDate
          cvc={cvc}
          setCvc={setCvc}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
        />

        <button
          type="submit"
          className="bg-black hover:bg-blue-600 block text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Payment
        </button>
      </form>
      <ThanksModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default PaymentPage;
