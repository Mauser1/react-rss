import firebase from 'firebase';
import { firebaseAuth, GoogleAuthProvider } from '../config';
import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
} from '../constants/actionTypes';

export function setAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}

export function signInSuccess(signInData) {
  console.log(signInData);
  const currentUser = {
    username: signInData.user.displayName,
    avatar: signInData.user.photoURL,
    uid: signInData.user.uid,
  };
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

// api
function databasePush(path, value) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .push(value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });
}

function addFeedSuccess() {
  return {
    type: ADD_FEED_SUCCESS,
  };
}

function addFeedFailure(error) {
  return {
    type: ADD_FEED_FAILURE,
    payload: error,
  };
}

export function addFeed(uid, name, link) {
  const feed = { link, name };
  return (dispatch) => {
    databasePush(`/users/${uid}/feeds/`, feed)
      .then(() => dispatch(addFeedSuccess()))
      .catch((error) => {
        dispatch(addFeedFailure(error));
        console.log(error);
      });
  };
}
