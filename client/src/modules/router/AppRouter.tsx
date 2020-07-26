import React from 'react';
import AuthenticatedRouter from './AuthenticatedApp';
import UnauthenticatedRouter from './UnauthenticatedApp';
import { useAuth } from '../auth/AuthProvider';

const AppRouter = () => {
  const { authState } = useAuth();

  return (
    <>
      {authState.username ? <AuthenticatedRouter /> : <UnauthenticatedRouter />}
    </>
  );
};

export default AppRouter;
