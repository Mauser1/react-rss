import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from '../constants/actionTypes';

export function openSideBar() {
  return { type: SIDE_BAR_OPEN };
}

export function closeSideBar() {
  return { type: SIDE_BAR_CLOSE };
}
