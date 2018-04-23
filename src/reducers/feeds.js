import {
  FETCH_FEED_LIST_SUCCESS,
  FETCH_FEED_ITEMS_SUCCESS,
} from '../constants/actionTypes';

const defaultFeeds = { feedList: [], latest: null, feedItems: [] };

const feedReducer = (state = defaultFeeds, action) => {
  switch (action.type) {
    case FETCH_FEED_LIST_SUCCESS:
      return {
        ...state,
        feedList: action.payload,
      };
    case FETCH_FEED_ITEMS_SUCCESS:
      return { ...state, feedItems: action.payload };
    default:
      return state;
  }
};

export default feedReducer;
