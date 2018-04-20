import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFeed } from '../actions';

function isInvalidName(name) {
  if (name.match['.#$[]']) {
    return true;
  }
  return false;
}
class AddFeedPage extends Component {
  static propTypes = {
    addFeed: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
  };
  state = {
    feedName: '',
    feedLink: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleAddFeed() {
    const { uid } = this.props;
    const { feedName, feedLink } = this.state;
    if (!uid) {
      alert('not logged in');
      return;
    }
    if (isInvalidName(feedName)) {
      alert('invalid');
      return;
    }
    this.props.addFeed(uid, feedName, feedLink);
  }
  render() {
    return (
      <div>
        <TextField
          value={this.state.feedName}
          hintText="Feed Name"
          name="feedName"
          onChange={e => this.handleChange(e)}
        />
        <br />
        <TextField
          value={this.state.feedLink}
          hintText="Feed URL"
          name="feedLink"
          onChange={e => this.handleChange(e)}
        />
        <br />
        <RaisedButton onClick={() => this.handleAddFeed()}>Add</RaisedButton>
      </div>
    );
  }
}
const mapStateToProps = state => ({ uid: state.common.currentUser.uid });
const mapDispatchToProps = dispatch => ({
  addFeed: (uid, name, link) => dispatch(addFeed(uid, name, link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedPage);
