import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC7r1OFcS25n7-fWd8RTNWLyRcsUnLVZxM',
  authDomain: 'rss-reader-1.firebaseapp.com',
  databaseURL: 'https://rss-reader-1.firebaseio.com',
  projectId: 'rss-reader-1',
  storageBucket: '',
  messagingSenderId: '1015923911526',
};

firebase.initializeApp(config);

const fbAuth = firebase.auth();
const fbDatabase = firebase.database();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { fbAuth, fbDatabase, GoogleAuthProvider };
