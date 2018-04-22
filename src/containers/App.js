import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import toastr from 'toastr';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';

/* eslint-disable */
class App extends Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      toastr.info('Please sign in to get access to your feeds');
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      return <Redirect to="/" />;
    }
  }
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
};

const mapStateToProps = state => ({
  sideBar: state.ui.sideBar,
  loggedIn: state.common.loggedIn,
});
export default withRouter(connect(mapStateToProps)(App));
