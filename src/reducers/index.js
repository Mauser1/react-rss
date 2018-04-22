import { combineReducers } from 'redux';
import commonReducer from './common';
import uiReducer from './ui';
import feedReducer from './feeds';

export default combineReducers({
  common: commonReducer,
  ui: uiReducer,
  feeds: feedReducer,
});
