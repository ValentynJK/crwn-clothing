import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles';
import { ShoppingIcon, ItemCount, CartIconContainer } from './cart-icon.styles';


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemQuantity } = useContext(CartContext);
  const handleIShoppingItemClick = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer>
      <ShoppingIcon onClick={handleIShoppingItemClick} />
      <ItemCount as='span'>{cartItemQuantity}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon