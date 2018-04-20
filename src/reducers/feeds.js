import { LOAD_FEEDS, ADD_FEED, REMOVE_FEED } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FEED:
      return [...state, action.payload];
    case REMOVE_FEED:
      return [...state.filter(feed => feed.name !== action.payload)];
    default:
      return state;
  }
};
