import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RoutePath } from './routeConstants';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { Header } from '../header/Header';

const PageHome = lazy(() => import('../../pages/Home/PageHome'));

export const AuthenticatedRouter = () => (
  <Suspense fallback={<FullPageLoader />}>
    <Router>
      <Header />
      <Switch>
        <Route path={RoutePath.login}>
          <Redirect to={RoutePath.operations} />
        </Route>
        <Route path={RoutePath.root} exact component={PageHome} />
      </Switch>
    </Router>
  </Suspense>
);
