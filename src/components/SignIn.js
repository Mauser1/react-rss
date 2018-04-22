import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleSignIn } from '../actions';

const SignIn = props => (
  <RaisedButton
    label="Sign in with Google"
    labelColor="#ffffff"
    backgroundColor="#dd4b39"
    onClick={props.handleSignIn}
    icon={<FontIcon className="fa fa-google-plus" />}
  />
);

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSignIn: () => dispatch(handleSignIn()),
});

export default connect(null, mapDispatchToProps)(SignIn);
