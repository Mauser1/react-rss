import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import FeedPage from './containers/FeedPage';
import AddFeedPage from './containers/AddFeedPage';
import Settings from './containers/Settings';
import NotFoundPage from './containers/NotFoundPage';
import store from './store';

const Root = () => (
  <Provider store={store}>

    <BrowserRouter>
      <App>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/feeds" component={FeedPage} />
            <Route path="/add" component={AddFeedPage} />
            <Route path="/settings" component={Settings} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </App>
    </BrowserRouter>
  </Provider>
);

export default Root;
