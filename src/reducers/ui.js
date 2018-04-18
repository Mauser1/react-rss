import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from '../constants/actionTypes';

const defaultState = {
  sideBar: false,
};
const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIDE_BAR_OPEN:
      return {
        ...state,
        sideBar: true,
      };

    case SIDE_BAR_CLOSE:
      return {
        ...state,
        sideBar: false,
      };

    default:
      return state;
  }
};
export default uiReducer;
