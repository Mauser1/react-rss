import { ADD_FEED, SET_LATEST_FEED_SUCCESS } from '../actions';

const dummyFeeds = [
  { name: 'Newest HN', link: 'https://hnrss.org/newest' },
  { name: 'Ask HN', link: 'https://hnrss.org/ask' },
  {
    name: 'Show HN',
    link: 'https://hnrss.org/show',
  },
  { name: 'Fox News Top', link: 'http://feeds.foxnews.com/foxnews/latest' },
  { name: 'Reuters TOP', link: 'http://feeds.reuters.com/reuters/topNews' },
];

const defaultFeeds = { feedList: dummyFeeds, latest: null, feedItems: [] };

const feedReducer = (state = defaultFeeds, action) => {
  switch (action.type) {
    case 'FETCH_FEED_ITEMS_SUCCESS':
      return {
        ...state,
        feedItems: action.payload,
      };
    case ADD_FEED:
      return {
        ...state,
        feedList: state.feedList.concat(action.payload),
      };
    case SET_LATEST_FEED_SUCCESS:
      return { ...state, latest: action.payload };
    default:
      return state;
  }
};

export default feedReducer;
