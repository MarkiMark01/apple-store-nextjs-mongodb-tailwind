"use client"; 
import React from "react";
import NavLinks from '../pages/header/NavLinks';
import LogoutItems from '../pages/header/LogoutItems';

const NavigationItems = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md">
      <div className="bg-black1 border-2 border-white rounded-lg p-6 max-w-lg mx-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-1 right-2 text-yellow-200 hover:text-red-600 text-xl font-bold"
        >
          &times; 
        </button>
        <div className="flex flex-col items-center justify-between text-white h-24"> 
          <NavLinks onClose={onClose} />
          <LogoutItems userName={userName} />
        </div>
      </div>
    </div>
  );
};

export default NavigationItems;



