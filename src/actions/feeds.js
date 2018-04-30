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

// add feed
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

// fetch feed item articles


function fetchFeedItemsFailure(error) {
  return { type: FETCH_FEED_ITEMS_FAILURE, payload: error };
}

function fetchFeedItemsSuccess(feedItems) {
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

// fetch feed list

function fetchFeedListSuccess(feedList) {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
    payload: feedList,
  };
}

function fetchFeedListFailure() {
  return {
    type: FETCH_FEED_LIST_SUCCESS,
  };
}

// converts firebase key-val obj to obj with id
function getFeedListValues(values) {
  const feed = values.val();
  feed.id = values.key;
  return (feed);
}

function receiveFeedList(feedList) {
  return (dispatch) => {
    if (feedList) {
      dispatch(fetchFeedListSuccess(getFeedListValues(feedList)));
    } else {
      dispatch(fetchFeedListFailure());
    }
  };
}
// function needed for main listener
export function listenToFeedChanges(uid) {
  return dispatch => fbDatabase.ref(`users/${uid}/feeds`).on('child_added', (values) => {
    dispatch(receiveFeedList(values));
  });
}

// clear feed item articles

export function clearFeedItems() {
  return ({ type: CLEAR_FEED_ITEMS });
}


// delete feed

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
// delete all feeds

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

