import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createHashHistory} from 'history';

const history = createHashHistory();

// Components
import App from './ui/App.jsx';
import Create from './ui/Create.jsx';
import Edit from './ui/Edit.jsx';

const RenderRoute = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/index" component={App} />
    </Switch>
  </Router>
);

export default RenderRoute;