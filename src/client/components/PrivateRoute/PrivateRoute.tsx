import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import RoutePath from '../../modules/router/routeConstants';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const isAuthenticated = false;

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
