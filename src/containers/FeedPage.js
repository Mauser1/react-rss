import React from 'react';
import { Paper } from 'material-ui';
import FeedSelector from '../components/FeedSelector';
import FeedView from '../components/FeedView';

const FeedPage = () => (
  <div>
    <Paper>
      <FeedSelector />
      <FeedView />
    </Paper>
  </div>);

export default FeedPage;
