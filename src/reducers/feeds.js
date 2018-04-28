import {
  FETCH_FEED_LIST_SUCCESS,
  FETCH_FEED_ITEMS_SUCCESS,
  DELETE_ALL_FEEDS_SUCCESS,
  DELETE_FEED_SUCCESS,
  CLEAR_FEED_ITEMS,
} from '../constants/actionTypes';

const defaultFeeds = { feedList: [], latest: null, feedItems: [] };

const feedReducer = (state = defaultFeeds, action) => {
  switch (action.type) {
    case FETCH_FEED_ITEMS_SUCCESS:
      return { ...state, feedItems: action.payload };
    case FETCH_FEED_LIST_SUCCESS:
      return { ...state, feedList: state.feedList.concat(action.payload) };
    case CLEAR_FEED_ITEMS:
      return { ...state, feedItems: [] };
    case DELETE_ALL_FEEDS_SUCCESS:
      return { ...state, feedList: [] };
    case DELETE_FEED_SUCCESS:
      return { ...state, feedList: state.feedList.filter(feed => feed.id !== action.payload) };
    default:
      return state;
  }
};

export default feedReducer;
