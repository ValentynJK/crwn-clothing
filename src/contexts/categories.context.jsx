import React from 'react';
import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
  // initial values
  categoriesMap: {},
  setProducts: () => null
});



// Products provide component
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {

    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap)
    };
    getCategoriesMap();

  },
    [])

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, []);
  const value = { categoriesMap };
  return <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider >
}