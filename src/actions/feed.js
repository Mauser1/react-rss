import firebase from 'firebase';

import {
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
  SET_LATEST_FEED_SUCCESS,
  SET_LATEST_FEED_FAILURE,
  FETCH_FEED_ITEMS_SUCCESS,
  FETCH_FEED_ITEMS_FAILURE,
  FETCH_FEED_LIST_SUCCESS,
} from '../constants/actionTypes';
import { fetchRss, databasePush } from './api';

export function fetchFeedListSuccess(feedList) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: feedList,
  };
}

export function fetchFeedListFailure(error) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: error,
  };
}
// feed util
export function getFeedListValues(feedObj) {
  return Object.values(feedObj);
}
export function fetchFeedList(uid) {
  return dispatch =>
    firebase
      .database()
      .ref(`/users/${uid}/feeds`)
      .once('value', (snap) => {
        dispatch(fetchFeedListSuccess(getFeedListValues(snap.val())));
      })
      .catch(error => dispatch(fetchFeedListFailure(error)));
}

export function addFeedSuccess() {
  return {
    type: ADD_FEED_SUCCESS,
  };
}

export function addFeedFailure(error) {
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
      });
  };
}

export function fetchFeedItemsFailure(error) {
  return { type: FETCH_FEED_ITEMS_FAILURE, payload: error };
}

export function fetchFeedItemsSuccess(feedItems) {
  return { type: FETCH_FEED_ITEMS_SUCCESS, payload: feedItems };
}

export function fetchFeedItems(link) {
  return (dispatch) => {
    fetchRss(link)
      .then((result) => {
        dispatch(fetchFeedItemsSuccess(result.data.items));
      })
      .catch(error => dispatch(fetchFeedItemsFailure(error)));
  };
}

export function setLatestFeedSuccess(feedEntry) {
  return {
    type: SET_LATEST_FEED_SUCCESS,
    payload: feedEntry,
  };
}

export function setLatestFeedFailure(error) {
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
