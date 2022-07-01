import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles';
import { ShoppingIconContainer, ItemCount, CartIconContainer } from './cart-icon.styles';


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemQuantity } = useContext(CartContext);
  const handleIShoppingItemClick = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer>
      <ShoppingIconContainer>
        <ShoppingIcon onClick={handleIShoppingItemClick} />
      </ShoppingIconContainer>
      <ItemCount as='span'>{cartItemQuantity}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon