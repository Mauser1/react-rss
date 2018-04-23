import { firebaseAuth, GoogleAuthProvider } from '../config';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  AUTH_INITIALIZATION_DONE,
} from '../constants/actionTypes';

export function authInitializedDone() {
  return {
    type: AUTH_INITIALIZATION_DONE,
  };
}

export function signInSuccess(signInData) {
  const currentUser = {
    username: signInData.displayName,
    avatar: signInData.photoURL,
    uid: signInData.uid,
  };
  const payload = {
    currentUser,
  };
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}
export function signInFailure(error) {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
}

export function signOutSuccess() {
  return { type: SIGN_OUT_SUCCESS };
}

export function authenticate(provider) {
  return (dispatch) => {
    firebaseAuth()
      .signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInFailure(error)));
  };
}
export function signInWithGoogle() {
  return authenticate(GoogleAuthProvider);
}
export function handleSignIn() {
  return signInWithGoogle();
}
