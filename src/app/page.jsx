"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import OvalLoader from "../components/loader/OvalLoader";
import ProductModal from "../components/modal/ProductModal";
import { useCart } from "../components/context/CartContext";
import FilterItems from "../components/pages/FilterItems";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
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
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [isSliderVisible, setIsSliderVisible] =
    useState(false);

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

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(results);
  }, [priceRange, products]);

  const addItemsToCart = (product) => {
    if (!session) {
      toast.error(
        "You need to log in to add items to the cart."
      );
      router.push("/login");
      return;
    }

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

    toast.success(
      `${product.title} added to cart successfully!`
    );
  };

  const openModal = (product) => {
    if (!session) {
      toast.error(
        "You need to log in to view product details."
      );
      router.push("/login");
      return;
    }
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

  const togglePriceSlider = () => {
    setIsSliderVisible((prev) => !prev);
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
      <FilterItems 
      handleInput={handleInput}
      togglePriceSlider={togglePriceSlider}
      isSliderVisible={isSliderVisible}
      input={input}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      />
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
                hover:bg-yellow-300 hover:text-black"
              >
                Add to Cart
              </button>
            </section>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          addToCart={addItemsToCart}
        />
      )}
    </section>
  );
}
