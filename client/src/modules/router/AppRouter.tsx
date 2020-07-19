import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Loader from '../../components/Loader/Loader';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import RoutePath from './routeConstants';

const PageLogin = loadable(() => import('../../pages/PageLogin/PageLogin'), {
  fallback: <Loader />,
});

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path={RoutePath.login}>
        <PageLogin />
      </Route>

      <PrivateRoute>
        <div>Test</div>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default AppRouter;
