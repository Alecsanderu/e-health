import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDepartments from '../reducers/departments.reducer';

export const selectDepartmentState = createFeatureSelector<fromDepartments.DepartmentState>(
  fromDepartments.departmentFeatureKey,
);


export const departments = createSelector(
  selectDepartmentState,
  (state) => state.list.departments,
);

export const departmentsError = createSelector(
  selectDepartmentState,
  (state) => state.list.error,
);

export const departmentsLoading = createSelector(
  selectDepartmentState,
  (state) => state.list.loading,
);

export const totalDepartments = createSelector(
  selectDepartmentState,
  (state) => state.list.departments.length,
);

export const createDepartmentSuccess = createSelector(
  selectDepartmentState,
  (state) => state.create.success,
);

export const createDepartmentError = createSelector(
  selectDepartmentState,
  (state) => state.create.error,
);

export const createDepartmentLoading = createSelector(
  selectDepartmentState,
  (state) => state.create.loading,
);
