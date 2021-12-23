import { createFeatureSelector, createSelector } from '@ngrx/store';
import { valueIsEmpty } from '../../config/functions/is-empty.function';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey,
);

export const successfulRegistration = createSelector(
  selectAuthState,
  (state) => state.registration.success,
);

export const errorOnRegistrations = createSelector(
  selectAuthState,
  (state) => state.registration.error,
);

export const loadingUserRegistration = createSelector(
  selectAuthState,
  (state) => state.registration.loading,
);


export const loadingUserLogin = createSelector(
  selectAuthState,
  (state) => state.login.loading,
);

export const jwtToken = createSelector(
  selectAuthState,
  (state) => state.login.jwtToken?.token,
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => !valueIsEmpty( state.login.jwtToken?.token ),
);

export const loggInError = createSelector(
  selectAuthState,
  (state) => state.login.error,
);

export const loggedInEmail = createSelector(
  selectAuthState,
  (state) => state.login.user?.email,
);

export const loggedInUser = createSelector(
  selectAuthState,
  (state) => state.login.user,
);
