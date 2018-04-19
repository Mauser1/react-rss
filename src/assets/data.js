import React from 'react';
import Toc from 'material-ui/svg-icons/action/toc';
import Assessment from 'material-ui/svg-icons/action/assessment';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const data = {
  menus: [
    { text: 'Home', icon: <Assessment />, link: '/' },
    { text: 'Read feeds', icon: <Toc />, link: '/feeds' },
    { text: 'Add feed', icon: <NoteAdd />, link: '/add' },
    { text: 'Settings', icon: <PermIdentity />, link: '/settings' },
    { text: 'Sign Out', icon: <ArrowBack />, link: '/signout' },
  ],
};

export default data;
