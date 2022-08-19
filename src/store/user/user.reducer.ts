import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.util";
import { signInFailed, signUpFailed, signOutFailed, signInSuccess, singOutSuccess } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload
    }
  };

  if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
    return {
      ...state,
      error: action.payload
    }
  };

  if (singOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    }
  };

  return state
}
