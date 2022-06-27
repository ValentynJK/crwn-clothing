import { createContext, useState, useEffect } from "react";

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

})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);


  // !!!ONE EFFECT - ONE RESPONSIBILITY
  // effect to count total quantity in cart
  useEffect(() => {
    const totalItems = cartItems.reduce((total, currItem) => total + currItem.quantity, 0);
    setCartItemQuantity(totalItems);
  }, [cartItems]);

  // effect to count total sum of cart
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, currItem) => total + currItem.quantity * currItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const deleteItemFromCart = productToDelete => {
    setCartItems(deleteCartItem(cartItems, productToDelete))
  };

  const decreaseItemQuantity = cartItem => {
    setCartItems(decreaseItems(cartItems, cartItem));
  };

  const addItemToCart = (productToAdd) => {
    /* setting cart items into cart list
    if productToAdd exist it cartItems its quantity increase by 1
    if productToAdd does not exist it adds it to cart list with quantity of 1    
    */
    setCartItems(addCartItem(cartItems, productToAdd))
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartItemQuantity,
    deleteItemFromCart,
    decreaseItemQuantity,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}