import firebase from 'firebase';
import {
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
  FETCH_FEED_ITEMS_SUCCESS,
  FETCH_FEED_ITEMS_FAILURE,
  FETCH_FEED_LIST_SUCCESS,
  DELETE_ALL_FEEDS_SUCCESS,
  DELETE_ALL_FEEDS_FAILURE,
  DELETE_FEED_SUCCESS,
  DELETE_FEED_FAILURE,
  CLEAR_FEED_ITEMS,
} from '../constants/actionTypes';
import { fetchRss, databasePush, databaseDelete } from './api';

export function fetchFeedListSuccess(feedList) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: feedList,
  };
}

export function fetchFeedListFailure() {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
  };
}
// feed util
export function getFeedListValues(values) {
  if (!values) {
    return [];
  }
  const feed = values.val();
  feed.id = values.key;
  return (feed);
}
export function receiveFeedList(feedList) {
  return (dispatch) => {
    if (feedList) {
      dispatch(fetchFeedListSuccess(getFeedListValues(feedList)));
    } else {
      dispatch(fetchFeedListFailure());
    }
  };
}
/* eslint-disable */

function handleSnapshot(ss){
  console.log(Object.values(ss.val()))
  return Object.values(ss.val())
}

export function getFeedsOnce(uid) {
  return dispatch => {
    firebase.database().ref(`users/${uid}/feeds`).once('value')
      .then(snapshot => dispatch(fetchFeedListSuccess(handleSnapshot(snapshot))));
  };
}

// listen to feed changes
export function listenToFeedChanges() {
  return (dispatch, getState) => {
    const { uid } = getState().common.currentUser;
    firebase.database().ref(`users/${uid}/feeds`).on('child_added', (values) => {
      dispatch(receiveFeedList(values));
    });
  };
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

export function clearFeedItems() {
  return ({ type: CLEAR_FEED_ITEMS });
}

function deleteFeedSuccess(feedId) {
  return { type: DELETE_FEED_SUCCESS, payload: feedId };
}


function deleteFeedFailure() {
  return { type: DELETE_FEED_FAILURE };
}
export function deleteFeed(feedId) {
  return (dispatch, getState) => {
    const { uid } = getState().common.currentUser;
    databaseDelete(`users/${uid}/feeds/`, feedId)
      .then(() => dispatch(deleteFeedSuccess(feedId)))
      .catch(error => dispatch(deleteFeedFailure(error)));
  };
}

function deleteAllFeedsSuccess() {
  return { type: DELETE_ALL_FEEDS_SUCCESS };
}

function deleteAllFeedsFailure(error) {
  return {
    type: DELETE_ALL_FEEDS_FAILURE,
    payload: error,
  };
}
export function deleteAllFeeds() {
  return (dispatch, getState) => {
    const { uid } = getState().common.currentUser;
    databaseDelete(`users/${uid}`, 'feeds')
      .then(() => {
        dispatch(deleteAllFeedsSuccess());
      })
      .catch(error => dispatch(deleteAllFeedsFailure(error)));
  };
}
