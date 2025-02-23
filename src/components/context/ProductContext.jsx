// src/context/ProductContext.js
import { createContext, useContext, useState } from "react";
import itemsData from "../../productos.json"; // Asegúrate de que este archivo existe

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Filtrar productos por categoría, si hay un filtro
  const filteredItemsData = categoryFilter
    ? itemsData.filter((item) => item.categoria === categoryFilter)
    : itemsData;

  return (
    <ProductContext.Provider value={{ filteredItemsData, setCategoryFilter }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
