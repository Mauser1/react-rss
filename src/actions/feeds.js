import {
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
  FETCH_FEED_ITEMS_SUCCESS,
  FETCH_FEED_ITEMS_FAILURE,
  DELETE_ALL_FEEDS_SUCCESS,
  DELETE_ALL_FEEDS_FAILURE,
  DELETE_FEED_SUCCESS,
  DELETE_FEED_FAILURE,
  CLEAR_FEED_ITEMS,
  UPDATED_FEED_LIST,
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
  const feed = { name, link };
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

// update feed list

function updatedFeedList(feedList) {
  return {
    type: UPDATED_FEED_LIST,
    payload: feedList,
  };
}
// converts firebase key-val objs to objs with id

export function handleFeedListUpdate(snapshot) {
  return (dispatch) => {
    const newFeedList = [];
    if (snapshot.exists()) {
      Object.keys(snapshot.val()).forEach((key, idx) => {
        let feed = {};
        feed = Object.values(snapshot.val())[idx];
        feed.id = key;
        newFeedList.push(feed);
      });
    }
    dispatch(updatedFeedList(newFeedList));
  };
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
