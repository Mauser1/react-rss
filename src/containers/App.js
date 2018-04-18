import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';

const mapStateToProps = () => ({
  // currentUser: state.common.currentUser,
  sideBar: false, /* state.ui.sideBar */
});

/* eslint-disable */
const App = props => (
  <div>
    <Appbar />
    <SideBar menus={data.menus} />
    <div>
      {props.children}
    </div>
  </div>
);


App.propTypes = {
  children: PropTypes.element,
  sideBar: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps)(App);
