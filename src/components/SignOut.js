import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleSignOut } from '../actions';

class SignOut extends Component {
  static propTypes = {
    handleSignOut: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.handleSignOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}
SignOut.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(handleSignOut()),
});

export default connect(null, mapDispatchToProps)(SignOut);
