// redux, react
import { FC, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//selectors, actions
import { selectCartItems } from '../../store/cart/cart.selector';
import { deleteItemFromCart, addItemToCart, decreaseItemQuantity } from '../../store/cart/cart.action';
// styles
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, RemoveButton, Value } from './checkout-item.styles';
// types
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
  checkoutItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems)

  const deleteHandler = useCallback(() => dispatch(deleteItemFromCart(cartItems, checkoutItem)), [cartItems, checkoutItem]);

  const increaseHandler = useCallback(() => dispatch(addItemToCart(cartItems, checkoutItem)), [cartItems, checkoutItem]);

  const decreaseHandler = useCallback(() => dispatch(decreaseItemQuantity(cartItems, checkoutItem)), [cartItems, checkoutItem]);

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
});

export default CheckoutItem;