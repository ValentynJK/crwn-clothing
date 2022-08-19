import { AnyAction } from "redux";
import { CartState } from "./cart.types";
import { setIsCartOpen, clearCart, changeCart } from "./cart.action";

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload
    }
  }

  if (changeCart.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    };
  }

  if (clearCart.match(action)) {
    return CART_INITIAL_STATE
  }

  return state
};
