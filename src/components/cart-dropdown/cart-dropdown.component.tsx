// react, redux
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
// components
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
// selectors
import { selectCartItems } from '../../store/cart/cart.selector';
// styling
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigateTo = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigateTo('/checkout');
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)) :
          (<EmptyMessage>
            No items yet
          </EmptyMessage>)}
      </CartItems>
      <Button type='button' children={'Go to checkout'} onClick={goToCheckoutHandler} />
    </CartDropdownContainer>
  )
};

export default CartDropdown;