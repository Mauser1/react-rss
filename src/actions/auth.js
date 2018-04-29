import firebase from 'firebase';
import { firebaseAuth, GoogleAuthProvider } from '../config';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from '../constants/actionTypes';

/* eslint-disable */
export function signInSuccess(signInData) {
  return dispatch => {
    const currentUser = {
      username: signInData.displayName,
      avatar: signInData.photoURL,
      uid: signInData.uid,
    };
    const payload = {
      currentUser,
    };
    return firebase.database().ref(`users/${signInData.uid}/info`).set(currentUser)
      .then(() => dispatch({
          type: SIGN_IN_SUCCESS,
          payload,
        }));
  }
}

/* eslint-enable */
export function signInFailure(error) {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
}

export function signOutSuccess() {
  return { type: SIGN_OUT_SUCCESS };
}

export function signOutFailure(signOutData) {
  return { type: SIGN_OUT_FAILURE, payload: signOutData };
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


export function signOut() {
  return firebaseAuth().signOut();
}

export function handleSignOut() {
  return (dispatch) => {
    firebaseAuth().signOut()
      .then(() => dispatch(signOutSuccess()))
      .catch(error => dispatch(signOutFailure(error)));
  };
}
