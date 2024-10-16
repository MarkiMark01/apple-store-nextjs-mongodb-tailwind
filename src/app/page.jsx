"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Range } from "react-range";

import CircleIcon from "../components/icons/CircleIcon";
import OvalLoader from "../components/loader/OvalLoader";
import ProductModal from "../components/modal/ProductModal";
import { useCart } from "../components/context/CartContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [isSliderVisible, setIsSliderVisible] = useState(false); // Додано

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
        product.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [input, products]);

  useEffect(() => {
    const results = products.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(results);
  }, [priceRange, products]);

  const addItemsToCart = (product) => {
    if (!session) {
      toast.error("You need to log in to add items to the cart.");
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

    toast.success(`${product.title} added to cart successfully!`);
  };

  const openModal = (product) => {
    if (!session) {
      toast.error("You need to log in to view product details.");
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
      <section className="flex justify-between items-center my-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="What are you looking to buy today?"
          className="w-full p-3 rounded-lg border 
        border-gray-300 shadow-md focus:outline-none focus:ring-2 
        focus:ring-gray-500 transition duration-300 ease-in-out transform 
        hover:scale-105"
        />
        <button
          onClick={togglePriceSlider}
          className="bg-gray-900 text-yellow-200 rounded-md 
             w-40 sm:w-40 h-12 ml-4 flex items-center 
             justify-center sm:justify-between px-4 text-lg 
             transition duration-300 hover:bg-yellow-200 
             hover:text-gray-900 shadow-lg transform 
             hover:scale-105"
        >
          <CircleIcon className="w-3 h-3 hidden sm:inline" />
          Price
          <span className="hidden sm:inline">Slider</span>
        </button>
      </section>
      {isSliderVisible && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h3>
          <Range
            step={1}
            min={0}
            max={1500}
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-300 rounded-lg"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-4 w-4 bg-black rounded-full cursor-pointer"
              />
            )}
          />
        </section>
      )}
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
              <span className="text-xl font-semibold">${product.price}</span>
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

