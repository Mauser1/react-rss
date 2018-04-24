import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';
import { signInSuccess, signOutSuccess, receiveFeedList } from '../actions';
import Appbar from '../components/Appbar';

import SideBar from '../components/SideBar';
import data from '../assets/data';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    signedIn: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    signInSuccess: PropTypes.func.isRequired,
    signOutSuccess: PropTypes.func.isRequired,
    receiveFeedList: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      // is authed
      if (user) {
        this.props.signInSuccess(user);
      } else {
        this.props.signOutSuccess();
      }
      firebase.database().ref(`users/${this.props.uid}/feeds`).on('child_added', (values) => {
        this.props.receiveFeedList(values);
      });
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { signedIn } = this.props;
    let menus;
    if (signedIn) {
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

const mapStateToProps = state => ({
  signedIn: state.common.signedIn,
  uid: state.common.currentUser.uid,
});
const mapDispatchToProps = dispatch => ({
  signInSuccess: signInData => dispatch(signInSuccess(signInData)),
  signOutSuccess: () => dispatch(signOutSuccess()),
  receiveFeedList: feedList => dispatch(receiveFeedList(feedList)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
