import firebase from 'firebase';
import axios from 'axios';
import { firebaseAuth, GoogleAuthProvider } from '../config';
import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
  SET_LATEST_FEED_SUCCESS,
  SET_LATEST_FEED_FAILURE,
  FETCH_FEED_ITEMS_SUCCESS,
  FETCH_FEED_ITEMS_FAILURE,
  FETCH_FEED_LIST_SUCCESS,
} from '../constants/actionTypes';

export function setAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}

export function signInSuccess(signInData) {
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

export function handleSignIn() {
  return signInWithGoogle();
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

function fetchFeedListSuccess(feedList) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: feedList,
  };
}

function fetchFeedListFailure(error) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: error,
  };
}

export function fetchFeedList(uid) {
  return dispatch =>
    firebase
      .database()
      .ref(`/users/${uid}/feeds`)
      .once('value', (snap) => {
        dispatch(fetchFeedListSuccess(snap));
      })
      .catch(error => dispatch(fetchFeedListFailure(error)));
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

// api
const Api = {
  fetchRss(url) {
    let feedUrl;
    if (!/^http:\/\//.test(url)) {
      feedUrl = `http://${url}`;
    }

    const API_URL = 'https://api.rss2json.com/v1/api.json';
    feedUrl = `${API_URL}?rss_url=${encodeURIComponent(url)}`;

    return axios(feedUrl);
  },
};

// end

function fetchFeedItemsFailure(error) {
  return { type: FETCH_FEED_ITEMS_FAILURE, payload: error };
}

function fetchFeedItemsSuccess(feedItems) {
  return { type: FETCH_FEED_ITEMS_SUCCESS, payload: feedItems };
}

export function fetchFeedItems(link) {
  return (dispatch) => {
    Api.fetchRss(link)
      .then((result) => {
        dispatch(fetchFeedItemsSuccess(result.data.items));
      })
      .catch(error => dispatch(fetchFeedItemsFailure(error)));
  };
}
// api end
function setLatestFeedSuccess(feedEntry) {
  return {
    type: SET_LATEST_FEED_SUCCESS,
    payload: feedEntry,
  };
}

function setLatestFeedFailure(error) {
  return {
    type: SET_LATEST_FEED_FAILURE,
    payload: error,
  };
}

export function setLatestFeed(uid, name, link) {
  const feedEntry = { name, link };
  return (dispatch) => {
    databasePush(`/users/${uid}/latest/`, feedEntry)
      .then(() => dispatch(setLatestFeedSuccess(feedEntry)))
      .catch((error) => {
        dispatch(setLatestFeedFailure(error));
        console.log(error);
      });
  };
}
