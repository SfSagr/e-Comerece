import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import products from '../data/Products';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity; 
        return updatedItems;
      }
  
      return [...prevItems, { product, quantity }];
    });
  };

  const handleCartClick = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 text-4xl font-semibold p-4 rounded-lg text-center my-10 text-black">
        <h1>Product List</h1>
        <div className="flex items-center text-black cursor-pointer" onClick={handleCartClick}>
          <span className="text-lg font-bold">{cartCount}</span>
          <FaShoppingCart className="ml-2 h-8" />
        </div>
      </div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
