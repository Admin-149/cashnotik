import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../core/rootReducer';

const userSelector = (state: RootState) => state.user;

const selectUserIsAuthenticated = createSelector(
  userSelector,
  (state) => state.isAuthenticated,
);

export default selectUserIsAuthenticated;
