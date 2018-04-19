import { auth } from '../config';
import { INIT_AUTH } from '../constants/actionTypes';


export function setAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}


export function initAuth() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();
        resolve(user);
      },
      error => reject(error),
    );
  });
}
