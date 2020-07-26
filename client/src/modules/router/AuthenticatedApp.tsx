import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import RoutePath from './routeConstants';
import FullPageLoader from '../../components/Loader/FullPageLoader';

const PageHome = lazy(() => import('../../pages/Home/PageHome'));

const AuthenticatedRouter = () => (
  <Suspense fallback={<FullPageLoader />}>
    <Router>
      <Switch>
        <Route path={RoutePath.login}>
          <Redirect to={RoutePath.root} />
        </Route>
        <Route path={RoutePath.root} component={PageHome} />
      </Switch>
    </Router>
  </Suspense>
);

export default AuthenticatedRouter;
