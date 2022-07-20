// react, redux
import { useSelector } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
// components
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
// styling
import { CategoryItem, CategoryContainer } from './category.styles';
// reduces selectors
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
  // species the clothes type
  const { category } = useParams();

  // gets all products object
  const categoriesMap = useSelector(selectCategoriesMap)

  // gets loading status for fetch request
  const isLoading = useSelector(selectCategoriesIsLoading);

  // sets products to render
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category])
  }, [category, categoriesMap])

  return (

    <CategoryContainer>
      <h2>{category.toUpperCase()}</h2>
      {isLoading ? <Spinner /> : (
        <CategoryItem>
          {isLoading ? <Spinner /> : products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryItem>
      )}
      )
    </CategoryContainer>

  )
};

export default Category;