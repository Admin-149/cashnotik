import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import RoutePath from '../../core/routeConstants';
import selectUserIsAuthenticated from '../../modules/user/useSelectors';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const isAuthenticated = useSelector(selectUserIsAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: RoutePath.login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
