import { combineReducers } from 'redux';
import commonReducer from './common';
import uiReducer from './ui';

export default combineReducers({
  common: commonReducer,
  ui: uiReducer,
});
