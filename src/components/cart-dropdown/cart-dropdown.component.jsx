import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {

  const navigateTo = useNavigate();
  const goToCheckoutHandler = () => {
    navigateTo('/checkout')
  }
  const { cartItems } = useContext(CartContext);
  console.log(cartItems === true)

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