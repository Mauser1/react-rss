import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';
import { initAuth } from '../actions';

const mapStateToProps = () => ({
  // currentUser: state.common.currentUser,
  sideBar: false, /* state.ui.sideBar */
});

/* eslint-disable */
class App extends Component {
  render(){
    return (<div>
    <Appbar />
    <SideBar menus={data.menus} />
    <div>
      {this.props.children}
    </div>
  </div>
);
  }
}


App.propTypes = {
  children: PropTypes.element,
  sideBar: PropTypes.bool.isRequired,
};


export default withRouter(connect(mapStateToProps)(App))
