// react, redux
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
// components
import Button, { BUTTON_TYPES } from '../button/button.component';
// selectors, actions
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector';
// styles
import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
// types
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardType = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardType> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt="name" />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button type='button' children='Add to cart' buttonType={BUTTON_TYPES.inverted} onClick={addProductToCart} ></Button>
    </ProductCardContainer>
  )
}

export default ProductCard;