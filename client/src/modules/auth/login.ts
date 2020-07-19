import appHistory from '../router/appHistory';
import RoutePath from '../router/routeConstants';

let inMemoryToken;

const login = ({ jwtToken, jwtTokenExpiry }, noRedirect) => {
  inMemoryToken = {
    token: jwtToken,
    expiry: jwtTokenExpiry,
  };

  if (!noRedirect) {
    appHistory.push(RoutePath.app);
  }
};
