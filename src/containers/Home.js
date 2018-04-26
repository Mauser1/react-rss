import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedPage from '../containers/FeedPage';
import SignIn from '../components/SignIn';

const mapStateToProps = state => ({ signedIn: state.common.signedIn });

const Home = ({ signedIn }) => {
  if (signedIn) {
    return <FeedPage />;
  }
  return <SignIn />;
};

Home.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Home);
