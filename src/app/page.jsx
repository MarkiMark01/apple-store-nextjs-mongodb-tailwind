"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import OvalLoader from "../components/loader/OvalLoader";
import ProductModal from "../components/modal/ProductModal";
import { useCart } from "../components/context/CartContext";
import CircleIcon from '../components/icons/CircleIcon';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(
    []
  );

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/product");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (input) {
      const results = products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(input.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [input, products]);

  const addItemsToCart = (product) => {
    addToCart({
      _id: product._id,
      image: product.image,
      title: product.title,
      model: product.model,
      colour: product.colour,
      price: product.price,
      totalPrice: product.price,
      quantity: 1,
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <OvalLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Something went wrong: {error}
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto min-h-screen p-4">
      <section className="flex items-center justify-around">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="What are you looking to buy today?"
          className="mb-4 w-1/2 max-w-3xl flex p-2 rounded-lg border 
          border-gray-300 shadow-md focus:outline-none focus:ring-2 
          focus:ring-gray-500"
        />
        <button
          type="button"
          className="flex items-center bg-gray-800 text-yellow-200 
          rounded-3xl p-2 text-xlhover:bg-gray-700 mb-4 w-24 shadow-lg 
          transition-transform duration-200 transform hover:scale-105
          h-12"
        >
          <CircleIcon />
          Filters
        </button>
      </section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
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
            <section className="flex items-center justify-between p-4 rounded-lg shadow-md mt-auto">
              <p className="text-2xl font-bold">
                ${product.price}
              </p>
              <button
                className="border px-4 py-2 font-semibold rounded-lg bg-black text-yellow-200 hover:bg-yellow-200 hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  addItemsToCart(product);
                }}
              >
                Add to cart
              </button>
            </section>
          </li>
        ))}
      </ul>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        addToCart={addToCart}
      />
    </section>
  );
}
