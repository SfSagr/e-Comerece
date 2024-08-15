import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Inc qty
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Dec qty
  };

  const handleAddToCart = () => {
    setIsAdded(true); // Show quantity controls when first added
    onAddToCart(product, quantity); // Add to cart with the current quantity
    setQuantity(1); // Reset quantity to 1 after adding to cart
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-lg text-blue-500 mt-2">Rs. {product.price * 80}</p>
      <p className="text-gray-600 mt-4">{product.description}</p>

    {isAdded ? 
      (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 text-black px-2 py-1 rounded-md"
          >
            -
          </button>
          <span className="mx-4 text-lg">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-200 text-black px-2 py-1 rounded-md"
          >
            +
          </button>
        </div>
      )  

      :

      (
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )
    }
    </div>
  );
};

export default ProductCard;
