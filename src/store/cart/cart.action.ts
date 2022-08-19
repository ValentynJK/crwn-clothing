import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from '../categories/category.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.util';

// support functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {

  // return cart item object if it is exist in cartItems array and false if not 
  const existingCartItem = cartItems.find((cartItem: CartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    /* 
    loop through the cartItems and if productToAdd already exist within cart list 
    it returns new array with +1 quantity for this product in cart list
    ! if true it reaches return statement and stop code executing
    */
    return cartItems.map((cartItem: CartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
  }

  // default function return. JS stop code executing after reaching first return statement
  return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const deleteCartItem = (cartItems: CartItem[], productToDelete: CartItem): CartItem[] => {
  const newCartItems = cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
  return newCartItems;
};

const decreaseItems = (cartItems: CartItem[], productToDecrease: CartItem): CartItem[] => {
  if (productToDecrease.quantity === 1) {
    return deleteCartItem(cartItems, productToDecrease);
  };
  return cartItems.map((cartItem) => cartItem.id === productToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
};

// types for action functions

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type ChangeCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export type ClearCart = Action<CART_ACTION_TYPES.CLEAR_CART>

export const changeCart = withMatcher((cartItems: CartItem[]): ChangeCart => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const deleteItemFromCart = (cartItems: CartItem[], productToDelete: CartItem): ChangeCart => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return changeCart(newCartItems);
};

export const decreaseItemQuantity = (cartItems: CartItem[], cartItem: CartItem): ChangeCart => {
  const newCartItems = decreaseItems(cartItems, cartItem);
  return changeCart(newCartItems)
};

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): ChangeCart => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return changeCart(newCartItems)
};

export const clearCart = withMatcher((): ClearCart => createAction(CART_ACTION_TYPES.CLEAR_CART));
