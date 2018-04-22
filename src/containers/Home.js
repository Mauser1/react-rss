import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import Dashboard from '../containers/Dashboard';

const mapStateToProps = state => ({ loggedIn: state.common.loggedIn });

const Home = (props) => {
  if (props.loggedIn) {
    return <Dashboard />;
  }
  return <SignIn />;
};

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Home);
