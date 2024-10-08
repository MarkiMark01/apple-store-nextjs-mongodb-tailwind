"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product._id}
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
                <p className="text-2xl font-bold">${product.price}</p>
                <button
                  className="border px-4 py-2 font-semibold rounded-lg 
                  bg-black text-yellow-200 hover:bg-yellow-200 
                  hover:text-black"
                >
                  Add to cart
                </button>
              </section>
            </li>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </ul>
    </main>
  );
}

