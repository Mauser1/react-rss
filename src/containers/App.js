import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { signInSuccess, handleFeedListUpdate } from '../actions';

import { fbDatabase, fbAuth } from '../config';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    signedIn: PropTypes.bool.isRequired,
    signInSuccess: PropTypes.func.isRequired,
    handleFeedListUpdate: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.unlisten = fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.signInSuccess(user);
        fbDatabase.ref(`users/${user.uid}`).child('feeds').on('value', this.props.handleFeedListUpdate);
      }
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const menu = this.props.signedIn ? 'signedIn' : 'signedOut';
    return (
      <div>
        <Appbar />
        <SideBar menus={data[menu]} />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  signedIn: state.common.signedIn,
});
const mapDispatchToProps = dispatch => ({
  signInSuccess: signInData => dispatch(signInSuccess(signInData)),
  handleFeedListUpdate: feedList => dispatch(handleFeedListUpdate(feedList)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
