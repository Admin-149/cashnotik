import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RoutePath } from './routeConstants';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { Header } from '../../components/Header/Header';
import { GlobalContainer } from '../../components/GlobalContainer/GlobalContainer';

const PageAccounts = lazy(() => import('../../pages/Accounts/PageAccounts'));
const PageCategories = lazy(() =>
  import('../../pages/Categories/PageCategories'),
);
const PageHome = lazy(() => import('../../pages/Home/PageHome'));
const PageOperations = lazy(() =>
  import('../../pages/Operations/PageOperations'),
);

export const AuthenticatedRouter = () => (
  <Suspense fallback={<FullPageLoader />}>
    <Router>
      <Header />
      <GlobalContainer>
        <Switch>
          <Route path={RoutePath.login}>
            <Redirect to={RoutePath.operations} />
          </Route>
          <Route path={RoutePath.accounts} component={PageAccounts} />
          <Route path={RoutePath.categories} component={PageCategories} />
          <Route path={RoutePath.root} exact component={PageHome} />
          <Route path={RoutePath.operations} component={PageOperations} />
        </Switch>
      </GlobalContainer>
    </Router>
  </Suspense>
);
