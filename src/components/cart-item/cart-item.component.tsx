// react
import { FC, memo } from 'react';
// styles
import { CartItemContainer, Image, ItemDetails, Name, Price } from './cart-item.styles';
// types
import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {

  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price as='span'>{`${quantity} x $${price}`}</Price>
      </ItemDetails>
    </CartItemContainer>

  )
})

export default CartItem;