import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';
import { signInSuccess, receiveFeedList, listenToFeedChanges, getFeedsOnce } from '../actions';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    signedIn: PropTypes.bool.isRequired,
    signInSuccess: PropTypes.func.isRequired,
    listenToFeedChanges: PropTypes.func.isRequired,
    getFeedsOnce: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signInSuccess(user);
        this.props.getFeedsOnce(user.uid);
      }
      this.props.listenToFeedChanges();
    });
  }
  componentWillUnmount() {
    this.removeListener();
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
  uid: state.common.currentUser.uid,
});
const mapDispatchToProps = dispatch => ({
  signInSuccess: signInData => dispatch(signInSuccess(signInData)),
  receiveFeedList: feedList => dispatch(receiveFeedList(feedList)),
  getFeedsOnce: uid => dispatch(getFeedsOnce(uid)),
  listenToFeedChanges: () => dispatch(listenToFeedChanges()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
