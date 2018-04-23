import axios from 'axios';
import firebase from 'firebase';

export function fetchRss(url) {
  let feedUrl;
  if (!/^http:\/\//.test(url)) {
    feedUrl = `http://${url}`;
  }

  const API_URL = 'https://api.rss2json.com/v1/api.json';
  feedUrl = `${API_URL}?rss_url=${encodeURIComponent(url)}`;

  return axios(feedUrl);
}

export function databasePush(path, value) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .push(value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });
}

export function databaseSet(path, value) {
  return firebase
    .database()
    .ref(path)
    .set(value);
}
