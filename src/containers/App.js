import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';
import { signInSuccess, receiveFeedList } from '../actions';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';

class App extends Component {
  static propTypes = {
    uid: PropTypes.string,
    children: PropTypes.element,
    signedIn: PropTypes.bool.isRequired,
    signInSuccess: PropTypes.func.isRequired,
    receiveFeedList: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signInSuccess(user);
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
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
