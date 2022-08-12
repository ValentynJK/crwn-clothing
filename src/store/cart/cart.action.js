import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from '../../utils/reducer/reduces.util';

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

const addCartItem = (cartItems, productToAdd) => {

  // return cart item object if it is exist in cartItems array and false if not 
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    /* 
    loop through the cartItems and if productToAdd already exist within cart list 
    it returns new array with +1 quantity for this product in cart list
    ! if true it reaches return statement and stop code executing
    */
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
  }

  // default function return. JS stop code executing after reaching first return statement
  return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const deleteCartItem = (cartItems, productToDelete) => {
  const newCartItems = cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
  return newCartItems;
};

const decreaseItems = (cartItems, productToDecrease) => {
  if (productToDecrease.quantity === 1) {
    return deleteCartItem(cartItems, productToDecrease);
  };
  return cartItems.map((cartItem) => cartItem.id === productToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemQuantity = (cartItems, cartItem) => {
  const newCartItems = decreaseItems(cartItems, cartItem);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearCart = () => createAction(CART_ACTION_TYPES.CLEAR_CART);
