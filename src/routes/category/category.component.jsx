import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <div className="category-container">
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className="category-item">
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
};

export default Category;