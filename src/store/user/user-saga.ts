import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { User } from 'firebase/auth'

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  singOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from "../../utils/firebase/firebase.util";


// saga which gets snapshot from user authentication 
export function* getSnapshotFromUseAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
    // console.log(userSnapshot);
    // console.log(userSnapshot.data());
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    }
  }
  catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUseAuth, userAuth)
  }
  catch (error) {
    yield* put(signInFailed(error as Error))
  }
};

export function* signInWithGoogle() {
  try {
    const googleUserAuth = yield* call(signInWithGooglePopup);
    if (!googleUserAuth) return;
    yield* call(getSnapshotFromUseAuth, googleUserAuth.user)
  }
  catch (error) {
    yield* put(signInFailed(error as Error))
  }
};

export function* signInWithEmailAndPass({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredentials = yield* call(signInAuthWithEmailAndPassword, email, password);
    if (userCredentials) {
      yield* call(getSnapshotFromUseAuth, userCredentials.user)
    }

  }
  catch (error) {
    yield* put(signInFailed(error as Error))
  }
};

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
  yield* call(getSnapshotFromUseAuth, user, additionalDetails);
}

export function* signUpWithEmailAndPass({ payload: { email, password, displayName } }: SignUpStart) {
  try {

    const userCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredentials) {
      yield* put(signUpSuccess(userCredentials.user, { displayName }))
    }
    // yield*call(getSnapshotFromUseAuth, user, displayName);
  }
  catch (error) {
    yield* put(signUpFailed(error as Error))
  }
};

export function* signOut() {
  try {
    yield* call(signOutUser)
    yield* put(singOutSuccess())
  }
  catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}

// entry point for checking the current user session
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
};

// entry point for google sign in
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

// entry point for sign in with email and password
export function* onSignInWithEmailAndPassStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPass)
};

// entry point for sign up with email and password
export function* onSignUpWithEmailAndPassStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmailAndPass)
};

// entry point for sign up success
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

// entry point for sign out
export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

// users aggregator function for users 
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onSignInWithEmailAndPassStart),
    call(onSignUpWithEmailAndPassStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ])
}