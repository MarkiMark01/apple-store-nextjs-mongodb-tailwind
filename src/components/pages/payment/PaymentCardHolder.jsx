import React from "react";

const PaymentCardHolder = ({ cardHolder, setCardHolder }) => {
  const handleInputChange = (e) => {
    setCardHolder(e.target.value);
  };

  return (
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
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
  );
};

export default PaymentCardHolder;
