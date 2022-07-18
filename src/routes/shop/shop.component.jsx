// react, redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// components
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// utils
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.util.js";
import { setCategories } from '../../store/categories/category.action'

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCollectionAndDocuments();
      dispatch(setCategories(categoriesArray))
    };
    getCategoriesMap();
  }, [dispatch])


  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
};

export default Shop;