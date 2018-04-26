import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleSignIn } from '../actions';


const SignIn = (props) => {
  if (props.signedIn) {
    return <Redirect to="/" />;
  }
  return (<RaisedButton
    label="Sign in with Google"
    labelColor="#ffffff"
    backgroundColor="#dd4b39"
    onClick={props.handleSignIn}
    icon={<FontIcon className="fa fa-google-plus" />}
  />);
};


SignIn.propTypes = {
  signedIn: PropTypes.string.isRequired,
  handleSignIn: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  signedIn: state.common.signedIn,
});

const mapDispatchToProps = dispatch => ({
  handleSignIn: () => dispatch(handleSignIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
