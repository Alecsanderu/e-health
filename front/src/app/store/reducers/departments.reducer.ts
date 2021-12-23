import { createReducer, on } from '@ngrx/store';
import { DepartmentDto } from '../../dtos/department.dto';
import * as DepartmentActions from '../actions/department.actions';

export const departmentFeatureKey = 'departments';

export interface DepartmentState {
    list: {
        loading: boolean;
        error: any
        success: boolean;
        departments: DepartmentDto[];
    };
    create: {
        loading: boolean;
        error: any
        success: boolean;
    };

}

export const initialState: DepartmentState = {
    list  : {
        loading    : false,
        error      : null,
        success    : false,
        departments: [],
    },
    create: {
        loading: false,
        error  : null,
        success: false,
    },
};


export const reducer = createReducer(
    initialState,
    on( DepartmentActions.loadDepartments,
        state => (
            {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            }
        ),
    ),
    on( DepartmentActions.loadDepartmentsSuccess,
        (state, { data }) => (
            {
                ...state,
                list: {
                    ...state.list,
                    loading    : false,
                    departments: data,
                    success    : true,
                },
            }
        ),
    ),
    on( DepartmentActions.failedToLoadDepartments,
        (state, { error }) => (
            {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    error,
                },
            }
        ),
    ),
    on( DepartmentActions.createDepartment, (state) => (
        {
            ...state,
            create: {
                loading: true,
                success: false,
                error  : null,
            },
        }
    ) ),
    on( DepartmentActions.createDepartmentSuccess, (state, { data }) => (
        {
            ...state,
            create: {
                loading: false,
                success: true,
                error  : null,
            },
            list  : {
                ...state.list,
                departments: [ ...state.list.departments, data ],
            },
        }
    ) ),
    on( DepartmentActions.createDepartmentFailed, (state, { error }) => (
        {
            ...state,
            create: {
                loading: false,
                success: false,
                error,
            },
        }
    ) ),
    on( DepartmentActions.clearCreateDepartmentStore, (state) => (
        {
            ...state,
            create: {
                ...initialState.create,
            },
        }
    ) ),
);
