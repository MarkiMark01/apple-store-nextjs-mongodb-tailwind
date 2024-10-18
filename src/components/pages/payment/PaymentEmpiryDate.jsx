import React from "react";

const PaymentExpiryDate = ({ setCvc, cvc, expiryDate, setExpiryDate }) => {
  return (
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
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length <= 4) {
              value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
            }
            setExpiryDate(value);
          }}
          maxLength={5}
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
          maxLength={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
    </div>
  );
};

export default PaymentExpiryDate;
