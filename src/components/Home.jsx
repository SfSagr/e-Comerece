import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import products from '../data/Products';

const Home = () => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  });
  const navigate = useNavigate();

  const handleAddToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.product.id === product.id);
      let updatedItems = [...prevItems];

      if (itemIndex >= 0) {
        updatedItems[itemIndex].quantity += quantity;
      } else {
        updatedItems.push({ product, quantity });
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 text-4xl font-semibold p-4 rounded-lg text-center md:my-10 text-white bg-[#242526]">
        <h1>Product List</h1>
        <div className="flex items-center text-white cursor-pointer" onClick={handleCartClick}>
          <span className="text-lg font-bold">{cartCount}</span>
          <FaShoppingCart className="ml-2 h-8" />
        </div>
      </div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
