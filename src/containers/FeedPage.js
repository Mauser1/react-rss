import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SelectField, MenuItem } from 'material-ui';
import FeedView from '../components/FeedView';
import { setLatestFeed, fetchFeedItems } from '../actions';

// two elements: FeedList (as seen above), and FeedItems (article items from link)

class FeedPage extends Component {
  static propTypes = {
    feedList: PropTypes.array.isRequired,
    feedItems: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired,
    fetchFeedItems: PropTypes.func.isRequired,
    setLatestFeed: PropTypes.func.isRequired,
  };
  state = { selectedFeed: '' };
  handleChange = (e, index, value) => {
    /* Todo: All ACTIONS */
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
      >
        {this.props.feedList.map(feed => (
          <MenuItem value={feed.link}> {feed.name}</MenuItem>
        ))}
      </SelectField>
    );
  }
  render() {
    const style = {
      display: 'flex',
      flexFlow: 'column',
    };

    return (
      <div style={style}>
        {this.renderFeedListSelector()}
        <FeedView feedItems={this.props.feedItems} />
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
