import { TNavItem } from './headerTypes';
import { RoutePath } from '../../modules/router/routeConstants';

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
    route: RoutePath.categories,
    translation: 'pages.categories',
  },
  {
    route: RoutePath.reports,
    translation: 'pages.reports',
  },
];
