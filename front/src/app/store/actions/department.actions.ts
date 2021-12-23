import { createAction, props } from '@ngrx/store';
import { CreateDepartmentDto } from '../../dtos/create-department.dto';
import { DepartmentDto } from '../../dtos/department.dto';

export const loadDepartments = createAction(
  '[Departments List] Load Departments',
);

export const failedToLoadDepartments = createAction(
  '[Departments List] Failed To Load Departments',
  props<{ error: any }>(),
);

export const loadDepartmentsSuccess = createAction(
  '[Departments List] Load Departments Success',
  props<{ data: DepartmentDto[] }>(),
);

export const createDepartment = createAction(
  '[Department List] Create Department',
  props<{ data: CreateDepartmentDto }>(),
);

export const createDepartmentSuccess = createAction(
  '[Department List] Create Department Success',
  props<{ data: DepartmentDto }>(),
);

export const createDepartmentFailed = createAction(
  '[Department List] Create Department Failed',
  props<{ error: any }>(),
);

export const clearCreateDepartmentStore = createAction(
  '[Department Create Form] Clear Create Department Store',
);
