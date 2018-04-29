import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signInWithGoogle } from '../actions';

const SignIn = props => (
  <RaisedButton
    label="Sign in with Google"
    labelColor="#ffffff"
    backgroundColor="#dd4b39"
    onClick={props.signInWithGoogle}
    icon={<FontIcon className="fa fa-google-plus" />}
  />
);


SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signInWithGoogle: () => dispatch(signInWithGoogle()),
});

export default connect(null, mapDispatchToProps)(SignIn);
