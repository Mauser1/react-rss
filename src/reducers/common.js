const defaultState = {
  appName: 'RSS Reader',
  token: null,
  viewChangeCounter: 0,
  currentUser: {
    username: 'Test_User',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/rss-reader-1.appspot.com/o/user.png?alt=media&token=473e0481-453d-45c3-95a6-ed53d7544d40',
  },
};
const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default commonReducer;
