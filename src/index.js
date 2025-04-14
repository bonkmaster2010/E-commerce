import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './components/layout';
import Create from './components/Create';
import Cart from './components/Cart.js';
import { ProductProvider } from './context/ProductProvider.js';
import CartProvider from './context/CartContext.js';
import ProductDetail from './components/ProductsDetail.js';
import NotFound from './components/404.js';
import Checkout from './components/Checkout.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProductProvider>
     <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<Create />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/Checkout' element={<Checkout/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
     </CartProvider>
    </ProductProvider>
  </BrowserRouter>
);
