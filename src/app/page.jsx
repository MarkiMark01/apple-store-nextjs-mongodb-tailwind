'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/product');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen w-full">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="border p-4 mb-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-lg">{product.model}</p>
            <p className="text-lg">{product.colour}</p>
            <p className="mb-2">{product.description}</p>
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              className="object-cover"
            />
            <p className="text-xl font-bold mt-2">${product.price}</p>
          </div>
        ))
        
      ) : (
        <p>Loading products...</p>
      )}
    </main>
  );
}


