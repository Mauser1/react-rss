import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { authListener } from '../actions';
import Appbar from '../components/Appbar';
import SideBar from '../components/SideBar';
import data from '../assets/data';


class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    signedIn: PropTypes.bool.isRequired,
    authListener: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.authListener();
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
  authListener: () => dispatch(authListener()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
