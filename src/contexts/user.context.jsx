import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reduces.util'

// ACTUAL STORAGE!
// as the actual value you want to access
// needed to be called inside useContext
export const UserContext = createContext({
  // initial value of createContext
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }

}

const INITIAL_STATE = {
  currentUser: null
}

// ACTUAL COMPONENT!
// This provider allows any of its child to access the any value of its state
// UserProvider is alias to use UserContext.Provider
// Needed in index.jsx to wrap the <App /> (or any other component you need to props in) component
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}