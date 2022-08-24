import { useSelector, useDispatch } from 'react-redux';

import { ShoppingIcon, ItemCount, CartIconContainer } from './cart-icon.styles';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const handleIShoppingItemClick = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={handleIShoppingItemClick}>
      <ShoppingIcon />
      <ItemCount as='span'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon