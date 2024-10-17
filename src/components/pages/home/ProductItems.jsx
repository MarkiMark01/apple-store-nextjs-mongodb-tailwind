import Image from "next/image";

const ProductItems = ({
  filteredProducts,
  openModal,
  addItemsToCart,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* {filteredProducts.map((product) => (
        <li
          key={product._id}
          onClick={() => openModal(product)}
          className="border p-4 rounded-lg shadow-md transition-transform 
            duration-200 hover:scale-105 cursor-pointer flex flex-col"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            className="object-cover rounded-md mb-4"
          />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">
              {product.title} {product.model}
            </h2>
            <p className="text-lg">{product.colour}</p>
          </div>
          <section className="flex items-center justify-between mt-4">
            <span className="text-xl font-semibold">
              ${product.price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItemsToCart(product);
              }}
              className="bg-yellow-200 text-gray-900 rounded-md px-3 py-2 transition duration-300 
              hover:bg-yellow-300 hover:text-black font-semibold"
            >
              Add to Cart
            </button>
          </section>
        </li>
      ))} */}
    </ul>
  );
};

export default ProductItems;
