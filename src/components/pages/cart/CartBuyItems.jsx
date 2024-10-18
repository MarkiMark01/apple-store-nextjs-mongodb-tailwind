import Link from "next/link";

const CartBuyItems = () => {
return (
    <div className="mt-4 text-right">
          <div className="text-xl font-bold text-yellow-500 bg-gray-700 p-2 rounded-lg shadow-lg text-center">
            <span className="block text-white">
              Total Amount
            </span>
            <span className="text-2xl text-yellow-300">
              ${totalAmount.toFixed(0)}
            </span>
          </div>
          <div
            className="text-2xl font-bold bg-red-700 p-2 rounded-lg shadow-lg text-center 
            mt-2 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Link
              href={"/payment"}
              className="text-2xl text-white block p-2 rounded-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
)
}
export default CartBuyItems;