import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';
// TODO
// add common articles subscriptions profile auth

// in common - navDrawerOpen
/* eslint-disable no-underscore-dangle */

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logger),
);
/* eslint-enable */

export default store;
