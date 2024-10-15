"use client";
import Image from "next/image";
import React from "react";

const ThanksModal = ({ onClose }) => {
    
  return (
    <div
      onClick={handleBackdropClick}
    >
      <div >
        <div >
          <Image
           src={'/thanks'}
           alt={"Gratitude"}
           width={400}
           height={300}
           className="object-cover rounded-md mb-4"
          />
          <button
            onClick={handleBackdropClick}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanksModal;
