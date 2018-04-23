import React, { Component } from 'react';
import { TextField, FlatButton, Paper } from 'material-ui';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { addFeed } from '../actions';

function isValidName(name) {
  if (name === '') return false;
  if (name.match['.#$[]']) return false;
  return true;
}

function isValidURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return pattern.test(str);
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
    if (!isValidName(feedName)) {
      toastr.warning('Empty name');
      return;
    }
    if (!isValidURL(feedLink)) {
      toastr.warning('Invalid link form');
      return;
    }
    this.props.addFeed(uid, feedName, feedLink);
    toastr.success('Feed added');
    this.setState({ feedName: '', feedLink: '' });
  }
  render() {
    const style = {
      container: {
        minWidth: 420,
        maxWidth: 500,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto',
        padding: 20,
        textAlign: 'center',
      },
      paper: { paddingTop: 10, paddingBottom: 10 },
    };
    return (
      <div style={style.container}>
        <Paper style={style.paper}>
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
          <FlatButton onClick={() => this.handleAddFeed()}>Add</FlatButton>

        </Paper>
      </div>
    );
  }
}
const mapStateToProps = state => ({ uid: state.common.currentUser.uid });
const mapDispatchToProps = dispatch => ({
  addFeed: (uid, name, link) => dispatch(addFeed(uid, name, link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedPage);
