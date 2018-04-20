import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';
import { setUser, setNoUser } from '../actions';

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setNoUser: () => dispatch(setNoUser()),
});

/* eslint-disable */
class App extends Component {
  render() {
    return (
      <div>
        <Appbar />
        <SideBar menus={data.menus} />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  sideBar: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  setNoUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
