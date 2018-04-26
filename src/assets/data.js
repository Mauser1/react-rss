import React from 'react';
import Toc from 'material-ui/svg-icons/action/toc';
import NoteAdd from 'material-ui/svg-icons/action/assessment';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

const data = {
  signedIn: [
    { text: 'Read feeds', icon: <Toc />, link: '/' },
    { text: 'Edit your feeds', icon: <NoteAdd />, link: '/settings' },
    { text: 'Sign Out', icon: <ArrowBack />, link: '/signout' },
  ],
  signedOut: [{ text: 'Sign In', icon: <ArrowForward />, link: '/signin' }],
};

export default data;
