const PaymentCardNumber = ({
  cardNumber,
  setCardNumber,
  handleCardNumberBlur,
}) => {
  return (
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
          const value = e.target.value.replace(/\D/g, "");
          if (value.length <= 16) {
            setCardNumber(
              value.replace(/(.{4})/g, "$1 ").trim()
            );
          }
        }}
        onBlur={handleCardNumberBlur}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        maxLength={19}
        required
      />
    </div>
  );
};
export default PaymentCardNumber;
