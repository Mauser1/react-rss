import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import Home from './containers/Home';
import FeedPage from './containers/FeedPage';
import Settings from './containers/Settings';
import NotFoundPage from './containers/NotFoundPage';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/feeds" component={FeedPage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/settings" component={Settings} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

export default Root;
