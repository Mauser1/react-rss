import { fbDatabase } from '../config';
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

// utils


export function getFeedListValues(values) {
  const feed = values.val();
  feed.id = values.key;
  return (feed);
}

// this handles snapshot of feed key-val pairs
function handleSnapshot(snap) {
  // check if feed value exists!
  const feedArray = [];
  const exists = (snap.val() !== null);
  if (exists) {
    snap.forEach((childSnap) => {
      const feed = getFeedListValues(childSnap);
      feedArray.push(feed);
    });
  }
  return feedArray;
}

// functions

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

export function getFeedsOnce(uid) {
  return (dispatch) => {
    fbDatabase.ref(`users/${uid}/feeds`).once('value')
      .then(snapshot => dispatch(fetchFeedListSuccess(handleSnapshot(snapshot))));
  };
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

// listen to feed changes
export function listenToFeedChanges(uid) {
  return dispatch => fbDatabase.ref(`users/${uid}/feeds`).on('child_added', (values) => {
    dispatch(receiveFeedList(values));
  });
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

export function addFeed(name, link) {
  const feed = { link, name };
  return (dispatch, getState) => {
    const { uid } = getState().common.currentUser;
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
