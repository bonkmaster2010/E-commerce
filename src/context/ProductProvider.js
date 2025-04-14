import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts, filter, setFilter }}>
      {children}
    </ProductContext.Provider>
  );
}
