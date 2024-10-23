// "use client";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import OvalLoader from "../components/loader/OvalLoader";
// import ProductModal from "../components/modal/ProductModal";
// import { useCart } from "../components/context/CartContext";
// import FilterItems from "../components/pages/home/FilterItems";
// import ProductItems from "../components/pages/home/ProductItems";

// export default function Home() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 1500]);
//   const [isSliderVisible, setIsSliderVisible] = useState(false);

//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch("/api/product");
//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await res.json();
//         setProducts(data);
//         setFilteredProducts(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = products;

//     if (input) {
//       filtered = filtered.filter((product) =>
//         product.title.toLowerCase().includes(input.toLowerCase())
//       );
//     }

//     filtered = filtered.filter(
//       (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(filtered);
//   }, [input, priceRange, products]);

//   const addItemsToCart = (product, quantity = 1) => {
//     if (!session) {
//       toast.error("You need to log in to add items to the cart.");
//       router.push("/login");
//       return;
//     }

//     addToCart({
//       _id: product._id,
//       image: product.image,
//       title: product.title,
//       model: product.model,
//       colour: product.colour,
//       price: product.price,
//       totalPrice: product.price * quantity,
//       quantity: quantity,
//     });

//     toast.success(`${product.title} added to cart successfully!`);
//   };

//   const openModal = (product) => {
//     if (!session) {
//       toast.error("You need to log in to view product details.");
//       router.push("/login");
//       return;
//     }
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleInput = (e) => {
//     setInput(e.target.value);
//   };

//   const togglePriceSlider = () => {
//     setIsSliderVisible((prev) => !prev);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <OvalLoader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Something went wrong: {error}
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-6xl mx-auto min-h-screen p-4">
//       <FilterItems
//         handleInput={handleInput}
//         togglePriceSlider={togglePriceSlider}
//         isSliderVisible={isSliderVisible}
//         input={input}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//       />
//       <ProductItems
//         filteredProducts={filteredProducts}
//         openModal={openModal}
//         addItemsToCart={addItemsToCart}
//       />
//       {isModalOpen && (
//         <ProductModal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           product={selectedProduct}
//           addToCart={(item, quantity) => addItemsToCart(item, quantity)} 
//         />
//       )}
//     </section>
//   );
// }






'use client';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import OvalLoader from "../components/loader/OvalLoader";
import ProductModal from "../components/modal/ProductModal";
import { useCart } from "../components/context/CartContext";
import FilterItems from "../components/pages/home/FilterItems";
import ProductItems from "../components/pages/home/ProductItems";
import { useModal } from "../components/hooks/useModal"; 

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal(); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
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
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (input) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [input, priceRange, products]);

  const addItemsToCart = (product, quantity = 1) => {
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
      totalPrice: product.price * quantity,
      quantity: quantity,
    });

    toast.success(`${product.title} added to cart successfully!`);
  };

  const handleOpenModal = (product) => {
    if (!session) {
      toast.error("You need to log in to view product details.");
      router.push("/login");
      return;
    }
    setSelectedProduct(product); 
    openModal(); 
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); 
    closeModal(); 
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
      <ProductItems
        filteredProducts={filteredProducts}
        openModal={handleOpenModal} 
        addItemsToCart={addItemsToCart}
      />
      {isOpen && (
        <ProductModal
          isOpen={isOpen}
          onClose={handleCloseModal} 
          product={selectedProduct}
          addToCart={(item, quantity) => addItemsToCart(item, quantity)} 
        />
      )}
    </section>
  );
}
