// For user data storage and distribution between components where it needed. 
// To prevent data drilling between components where this info is not needed.

import { createContext, useState, useEffect } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangeListener } from '../utils/firebase/firebase.util';

// ACTUAL STORAGE!
// as the actual value you want to access
// needed to be called inside useContext
export const UserContext = createContext({
  // initial value of createContext
  currentUser: null,
  setCurrentUser: () => null
});

// ACTUAL COMPONENT!
// This provider allows any of its child to access the any value of its state
// UserProvider is alias to use UserContext.Provider
// Needed in index.jsx to wrap the <App /> (or any other component you need to props in) component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };


  // to sing in/ sign out listener unsubscribe
  // it mounts only once, return the auth state and end its cycle
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}