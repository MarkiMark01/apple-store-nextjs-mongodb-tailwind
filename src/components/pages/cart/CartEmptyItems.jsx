import CartIcon from "../../icons/CartIcon";

const CartEmptyItems = () => {
  return (
    <div className="text-xl font-bold flex items-center justify-center min-h-screen gap-4">
      <p className="text-2xl font-semibold">
        Your cart is empty...
      </p>
      <CartIcon />
    </div>
  );
};
export default CartEmptyItems;
