import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/actionTypes';

const defaultState = {
  appName: 'RSS Reader',
  loggedIn: false,
  token: null,
  viewChangeCounter: 0,
  currentUser: {
    username: 'Test_User',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/rss-reader-1.appspot.com/o/user.png?alt=media&token=473e0481-453d-45c3-95a6-ed53d7544d40',
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
        loggedIn: true,
      };
    case SIGN_IN_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default commonReducer;
