import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryItem, CategoryContainer } from './category.styles';
import { selectCategory } from '../../store/categories/category.selector';

const Category = () => {
  // species the clothes type
  const { category } = useParams();

  // gets all products object
  const categoriesMap = useSelector(selectCategory)

  // sets products to render
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <CategoryContainer>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <CategoryItem>
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryItem>
    </CategoryContainer>
  )
};

export default Category;