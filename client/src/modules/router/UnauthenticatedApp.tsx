import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import RoutePath from './routeConstants';
import FullPageLoader from '../../components/Loader/FullPageLoader';

const PageLogin = lazy(() => import('../../pages/Login/PageLogin'));

const UnauthenticatedRouter = () => (
  <Suspense fallback={<FullPageLoader />}>
    <Router>
      <Switch>
        <Route path={RoutePath.login} component={PageLogin} />
        <Redirect to={RoutePath.login} />
      </Switch>
    </Router>
  </Suspense>
);

export default UnauthenticatedRouter;
