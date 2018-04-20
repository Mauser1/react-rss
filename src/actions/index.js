import { firebaseAuth, GoogleAuthProvider } from '../config';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SET_USER, SET_NO_USER } from '../constants/actionTypes';

export function setAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}

export function signInSuccess(signInData) {
  const currentUser = { username: signInData.user.displayName, avatar: signInData.user.photoURL };
  const payload = {
    currentUser,
    token: signInData.credential.idToken,
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

export function setUser(user) {
  const currentUser = { username: user.displayName, avatar: user.photoURL };
  const token = user.uid;
  const payload = {
    currentUser,
    token,
  };
  return { type: SET_USER, payload };
}
export function setNoUser() {
  return { type: SET_NO_USER };
}
