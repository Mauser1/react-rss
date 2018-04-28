import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';
import { clearFeedItems } from '../actions';

class FeedView extends Component {
  static propTypes = {
    feedItems: PropTypes.array.isRequired,
    clearFeedItems: PropTypes.func.isRequired,
  };
  componentWillUnmount() {
    this.props.clearFeedItems();
  }
  render() {
    const { feedItems } = this.props;
    if (!feedItems) {
      return null;
    }
    return (
      <List>
        {feedItems.map(feed => (
          <ListItem
            href={feed.link}
            primaryText={feed.title}
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>{feed.author}</span>{' '}
                {feed.pubDate}
                <br />
                {feed.description}
              </p>
          }
            secondaryTextLines={3}
          />
      ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  feedItems: state.feeds.feedItems,
});

const mapDispatchToProps = dispatch => ({ clearFeedItems: () => dispatch(clearFeedItems()) });

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
