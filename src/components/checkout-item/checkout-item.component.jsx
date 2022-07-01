import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, RemoveButton, Value } from './checkout-item.styles';

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { deleteItemFromCart, addItemToCart, decreaseItemQuantity } = useContext(CartContext);

  const deleteHandler = () => deleteItemFromCart(checkoutItem);

  const increaseHandler = () => addItemToCart(checkoutItem);

  const decreaseHandler = () => decreaseItemQuantity(checkoutItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan className='name'>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decreaseHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseHandler}>&#10095;</Arrow>
      </Quantity>

      <BaseSpan className='price'>{price}</BaseSpan>
      <RemoveButton as='span' onClick={deleteHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;