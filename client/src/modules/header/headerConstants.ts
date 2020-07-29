import { TNavItem } from './headerTypes';
import { RoutePath } from '../router/routeConstants';

export const navItems: TNavItem[] = [
  {
    route: RoutePath.operations,
    translation: 'pages.operations',
  },
  {
    route: RoutePath.accounts,
    translation: 'pages.accounts',
  },
  {
    route: RoutePath.reports,
    translation: 'pages.reports',
  },
];
