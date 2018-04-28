import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, ListItem, Paper, Divider, FlatButton } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import toastr from 'toastr';
import globalStyle from '../assets/style';
import { deleteFeed, deleteAllFeeds } from '../actions';


class DeleteFeedSelector extends Component {
  static propTypes = {
    feedList: PropTypes.array.isRequired,
    deleteFeed: PropTypes.func.isRequired,
    deleteAllFeeds: PropTypes.func.isRequired,
  };
  /* eslint-disable react/jsx-boolean-value */
  handleDeleteAll() {
    if (window.confirm('Are you sure you want to delete all feeds?')) {
      this.props.deleteAllFeeds();
      toastr.info('All feeds deleted');
    }
  }
  handleDelete(feedId) {
    this.props.deleteFeed(feedId);
    toastr.info('Feed deleted');
  }
  renderList() {
    return this.props.feedList.map(feed => (
      <span>
        <ListItem
          leftAvatar={<Delete />}
          primaryText={feed.name}
          secondaryText={feed.link}
          onClick={() => this.handleDelete(feed.id)}
        />
        <Divider inset={true} />
      </span>
    ));
  }
  renderFeedSelector() {
    const buttonStyle = { buttons: { textAlign: 'center', marginTop: 30, marginBottom: 30 } };
    return (
      <div>
        <List>
          {this.renderList()}
        </List>
        <div style={buttonStyle.buttons}>
          <FlatButton
            label="Delete all"
            onClick={() => this.handleDeleteAll()}
          />
        </div>
      </div>);
  }
  render() {
    return (
      <div style={globalStyle.container}>
        <Paper>
          <h2 style={globalStyle.title}> Delete </h2>
          {this.renderFeedSelector()}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedList: state.feeds.feedList,
});

const mapDispatchToProps = dispatch => ({
  deleteFeed: feedId => dispatch(deleteFeed(feedId)),
  deleteAllFeeds: () => dispatch(deleteAllFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFeedSelector);
