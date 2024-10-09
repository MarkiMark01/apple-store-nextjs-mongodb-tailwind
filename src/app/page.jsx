"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import OvalLoader from "../components/loader/OvalLoader";
import ProductModal from "../components/modal/ProductModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="max-w-6xl mx-auto h-screen p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
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
                onClick={(e) => e.stopPropagation()}
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
      />
    </section>
  );
}
