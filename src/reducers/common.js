import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  ADD_FEED_FAILURE,
  DELETE_FEED_FAILURE,
  DELETE_ALL_FEEDS_FAILURE,
  FETCH_FEED_LIST_SUCCESS,
} from '../constants/actionTypes';

const defaultState = {
  appName: 'RSS Reader',
  signedIn: false,
  token: null,
  viewChangeCounter: 0,
  listLoaded: false,
  currentUser: {
    username: 'Test_User',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/rss-reader-1.appspot.com/o/user.png?alt=media&token=473e0481-453d-45c3-95a6-ed53d7544d40',
    uid: null,
  },
  error: '',
};

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
        signedIn: true,
      };
    case SIGN_IN_FAILURE:
      return { ...state, error: action.payload, signedIn: true };
    case SIGN_OUT_SUCCESS:
      return { ...state, currentUser: {}, signedIn: false };
    case SIGN_OUT_FAILURE:
      return { ...state, error: action.payload };
    case ADD_FEED_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_FEED_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_ALL_FEEDS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_FEED_LIST_SUCCESS:
      return { ...state, listLoaded: true };
    default:
      return state;
  }
};

export default commonReducer;
