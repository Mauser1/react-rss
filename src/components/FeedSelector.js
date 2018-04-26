import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SelectField, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import { setLatestFeed, fetchFeedItems } from '../actions';

class FeedSelector extends Component {
  static propTypes = {
    feedList: PropTypes.string.isRequired,
    fetchFeedItems: PropTypes.func.isRequired,
    setLatestFeed: PropTypes.func.isRequired,
  }
  state = { selectedFeed: '' };
  handleChange = (e, index, value) => {
    const feedName = e.target.innerHTML;
    const feedLink = value;

    this.props.fetchFeedItems(feedLink);
    this.props.setLatestFeed(feedName, feedLink);
  };
  render() {
    const style = {
      emptyState: {
        textAlign: 'center', margin: 'auto', fontSize: 24,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#757575',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
      },
    };

    if (!this.props.feedList) {
      return <div> Loading...</div>;
    }
    if (this.props.feedList.length === 0) {
      return (
        <div style={style.emptyState}>
          <h1 style={style.title}>You have no feeds!  </h1>
          <Link to="settings"> Add some! :) </Link>
        </div>);
    }
    return (
      <div>
        <SelectField
          floatingLabelText="Feeds available"
          value={this.state.selectedFeed}
          onChange={this.handleChange}
          style={{ marginLeft: '20px', width: '30%' }}
        >
          {this.props.feedList.map(feed => (
            <MenuItem value={feed.link}> {feed.name}</MenuItem>
        ))}
        </SelectField>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  feedList: state.feeds.feedList,
  feedItems: state.feeds.feedItems,
});
const mapDispatchToProps = dispatch => ({
  fetchFeedItems: feedLink => dispatch(fetchFeedItems(feedLink)),
  setLatestFeed: (feedName, feedLink) =>
    dispatch(setLatestFeed(feedName, feedLink)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedSelector);
