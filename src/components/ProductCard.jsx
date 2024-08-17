import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productInCart = savedCartItems.some(item => item.product.id === product.id);
    setIsAdded(productInCart);
  }, [product.id]);

  const handleAddToCart = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedItems = savedCartItems.some(item => item.product.id === product.id)
      ? savedCartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...savedCartItems, { product, quantity }];

    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    onAddToCart(product, quantity);
    setIsAdded(true);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="bg-[#242526] text-white rounded-lg shadow-md p-6 text-center relative hover:shadow-[#595c5e]">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-cover mx-auto rounded-md"
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-lg text-blue-500 mt-2">Rs. {product.price * 80}</p>
      <p className="mt-4">{product.description}</p>

      {!isAdded ? (
        <button
          onClick={handleAddToCart}
          className="mt-6 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={handleGoToCart}
          className="mt-6 py-2 px-4 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Added Go to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
