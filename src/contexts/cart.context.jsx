import React from 'react';
import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reduces.util'

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartItemQuantity: 0,
  countCartQuantity: () => null,
  deleteItemFromCart: () => null,
  decreaseItemQuantity: () => null,
  cartTotal: 0,
  serCartTotal: () => null,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
};

export const CartProvider = ({ children }) => {

  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, currItem) => total + currItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, currItem) => total + currItem.quantity * currItem.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
        {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount
        }
      )
    )
  };

  const setIsCartOpen = () => {
    dispatch(
      createAction(
        CART_ACTION_TYPES.SET_IS_CART_OPEN, !isCartOpen
      )
    )
  }

  const deleteItemFromCart = productToDelete => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemQuantity = cartItem => {
    const newCartItems = decreaseItems(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    deleteItemFromCart,
    decreaseItemQuantity,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}