import React from 'react';
import './cart-dropdown.styles.scss';
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

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
      </div>
      <Button type='button' children={'Go to checkout'} onClick={goToCheckoutHandler} />
    </div>
  )
};

export default CartDropdown;