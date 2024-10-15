"use client";
import Image from "next/image";
import React from "react";

const ThanksModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Image
          src={'/thanks.jpg'}
          alt={"Gratitude"}
          width={400}
          height={300}
          className="object-cover rounded-md mb-4"
        />
        <button
          onClick={closeModal}
          className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ThanksModal;

