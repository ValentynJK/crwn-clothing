import React from 'react';
import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

const CategoryPreview = ({ products, title }) => {


  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products.slice(0, 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer >
  );
};

export default CategoryPreview;