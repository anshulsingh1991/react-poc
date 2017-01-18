import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Messages from './app/Messages';
import Notifications from './app/Notifications';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">
      <Route path="/messages" component={Messages}></Route>
      <Route path="/notifications" component={Notifications}></Route>
      <IndexRoute component={App} />
    </Route>
  </Router>,
  document.getElementById('root')
);
