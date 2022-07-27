// react, redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// components
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// utils
import { fetchCategoriesStart } from '../../store/categories/category.action'

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
};

export default Shop;