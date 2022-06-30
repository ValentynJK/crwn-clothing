import './checkout-item.component.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { deleteItemFromCart, addItemToCart, decreaseItemQuantity } = useContext(CartContext);

  const deleteHandler = () => deleteItemFromCart(checkoutItem);

  const increaseHandler = () => addItemToCart(checkoutItem);

  const decreaseHandler = () => decreaseItemQuantity(checkoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className="arrow" onClick={decreaseHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseHandler}>&#10095;</div>
      </span>

      <span className='price'>{price}</span>
      <span className="remove-button" onClick={deleteHandler}>&#10005;</span>
    </div>
  )
};

export default CheckoutItem;