import React from 'react';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../../modules/router/routeConstants';

const PageHome = () => <Redirect to={RoutePath.accounts} />;

export default PageHome;
