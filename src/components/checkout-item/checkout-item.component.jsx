// redux
import { useDispatch, useSelector } from 'react-redux';
//selectors, actions
import { selectCartItems } from '../../store/cart/cart.selector';
import { deleteItemFromCart, addItemToCart, decreaseItemQuantity } from '../../store/cart/cart.action';
// styles
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, RemoveButton, Value } from './checkout-item.styles';

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems)

  const deleteHandler = () => dispatch(deleteItemFromCart(cartItems, checkoutItem));

  const increaseHandler = () => dispatch(addItemToCart(cartItems, checkoutItem));

  const decreaseHandler = () => dispatch(decreaseItemQuantity(cartItems, checkoutItem));

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