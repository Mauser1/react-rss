import axios from 'axios';
import { fbDatabase } from '../config';

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
    fbDatabase
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


export function databaseDelete(path, value) {
  return fbDatabase.ref(`${path}/${value}`).remove();
}
