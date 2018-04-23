import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SelectField, MenuItem, Paper } from 'material-ui';
import FeedView from '../components/FeedView';
import { setLatestFeed, fetchFeedItems } from '../actions';

// two elements: FeedList (as seen above), and FeedItems (article items from link)

class FeedPage extends Component {
  static propTypes = {
    feedItems: PropTypes.array.isRequired,
    feedList: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired,
    fetchFeedItems: PropTypes.func.isRequired,
    setLatestFeed: PropTypes.func.isRequired,
  };
  state = { selectedFeed: '' };
  handleChange = (e, index, value) => {
    const feedName = e.target.innerHTML;
    const feedLink = value;
    const { uid } = this.props;

    this.props.fetchFeedItems(feedLink);
    this.props.setLatestFeed(uid, feedName, feedLink);
  };
  renderFeedListSelector() {
    if (!this.props.feedList) {
      return <div> Loading ...</div>;
    }
    if (this.props.feedList === []) {
      return <div> You have yet to add any feeds</div>;
    }
    return (
      <SelectField
        floatingLabelText="Feeds available"
        value={this.state.selectedFeed}
        onChange={this.handleChange}
        style={{ marginLeft: '20px', width: '90%' }}
      >
        {this.props.feedList.map(feed => (
          <MenuItem value={feed.link}> {feed.name}</MenuItem>
        ))}
      </SelectField>
    );
  }
  render() {
    const style = {
      container: { margin: '0 auto', padding: '30px' },
    };
    return (
      <div style={style.container}>
        <Paper>
          {this.renderFeedListSelector()}
          <FeedView feedItems={this.props.feedItems} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedList: state.feeds.feedList,
  feedItems: state.feeds.feedItems,
  uid: state.common.currentUser.uid,
});
const mapDispatchToProps = dispatch => ({
  fetchFeedItems: feedLink => dispatch(fetchFeedItems(feedLink)),
  setLatestFeed: (uid, feedName, feedLink) =>
    dispatch(setLatestFeed(uid, feedName, feedLink)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
