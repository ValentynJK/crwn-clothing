// react, redux
import { useSelector } from 'react-redux';
// components
import ProductCard from '../product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
// selectors
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';
// styling
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

const CategoryPreview = ({ products, title }) => {

  // gets fetch loading status
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      {isLoading ? <Spinner /> : (
        <Preview>
          {products.slice(0, 4)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Preview>)
      }
    </CategoryPreviewContainer >
  );
};

export default CategoryPreview;