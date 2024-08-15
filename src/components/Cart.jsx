import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDelete = (productId) => {
    updateCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const handleIncrement = (productId) => {
    updateCartItems(
      cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    updateCartItems(
      cartItems.flatMap(item =>
        item.product.id === productId
          ? item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
            : []
          : [item]
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center">Your Cart</h1>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.length === 0 ? (
          <li className="text-center col-span-3">Your cart is empty.</li>
        ) : (
          cartItems.map(item => (
            <li key={item.product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-40 object-cover rounded-md mb-2"
              />
              <p className="text-lg text-blue-500">Price: Rs. {item.product.price * 80}</p>
              <p className="text-gray-600 mt-2">{item.product.description}</p>
              <div className="flex items-center mt-2">
                <button onClick={() => handleDecrement(item.product.id)} className="bg-gray-200 text-black px-2 py-1 rounded-md">-</button>
                <span className="mx-2 text-lg">{item.quantity}</span>
                <button onClick={() => handleIncrement(item.product.id)} className="bg-gray-200 text-black px-2 py-1 rounded-md">+</button>
              </div>
              <button
                onClick={() => handleDelete(item.product.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md font-bold hover:bg-red-600"
              >
                Remove item
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;
