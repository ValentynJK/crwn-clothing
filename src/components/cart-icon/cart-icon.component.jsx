import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

import './cart-icon.styles.scss';


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemQuantity } = useContext(CartDropdownContext);
  const handleIShoppingItemClick = () => setIsCartOpen(!isCartOpen);
  return (
    <div className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' onClick={handleIShoppingItemClick} />
      <span className='item-count'>{cartItemQuantity}</span>
    </div>
  )
}

export default CartIcon