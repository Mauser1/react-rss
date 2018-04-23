import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';
import { signInSuccess, signOutSuccess, fetchFeedList } from '../actions';
import Appbar from '../components/Appbar';

import SideBar from '../components/SideBar';
import data from '../assets/data';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    signedIn: PropTypes.bool.isRequired,
    signInSuccess: PropTypes.func.isRequired,
    signOutSuccess: PropTypes.func.isRequired,
    fetchFeedList: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      // is authed
      if (user) {
        this.props.signInSuccess(user);
        this.props.fetchFeedList(user.uid);
      } else {
        this.props.signOutSuccess();
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    let menus;
    if (signedIn) {
      const { signedIn } = this.props;
      menus = data.signedIn;
    } else {
      menus = data.signedOut;
    }
    return (
      <div>
        <Appbar />
        <SideBar menus={menus} />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signedIn: state.common.signedIn,
});
const mapDispatchToProps = (dispatch) => ({
  signInSuccess: (signInData) => dispatch(signInSuccess(signInData)),
  signOutSuccess: () => dispatch(signOutSuccess()),
  fetchFeedList: (uid) => dispatch(fetchFeedList(uid)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
