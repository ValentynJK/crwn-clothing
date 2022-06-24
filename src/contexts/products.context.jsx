import { createContext, useState, useEffect } from "react";
import PRODUCTS from '../shop-data.json'

export const ProductContext = createContext({
  // initial values
  products: [],
  setProducts: () => null
});


// Products provide component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return <ProductContext.Provider value={value}> {children}</ProductContext.Provider >
}