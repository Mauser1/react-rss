import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';

const FeedView = ({ feedItems }) => {
  // todo if conditional
  // add link
  if (!feedItems) {
    return null;
  }
  if (!feedItems === []) {
    return <div> no items </div>;
  }
  return (
    <List>
      {feedItems.map(feed => (
        <ListItem
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
};

FeedView.propTypes = { feedItems: PropTypes.array.isRequired };

const mapStateToProps = state => ({
  feedItems: state.feeds.feedItems,
});
export default connect(mapStateToProps)(FeedView);
