import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);
