import { createReducer, on } from '@ngrx/store';
import { DoctorDto } from '../../dtos/doctor.dto';
import * as DoctorActions from '../actions/doctors.actions';

export const doctorsFeatureKey = 'doctors';

export interface DoctorsState {
    doctors: {
        loading: boolean;
        error: any
        success: boolean;
        doctors: DoctorDto[];
    };
    create: {
        loading: boolean;
        success: boolean;
        error: any;
    };

}

export const initialState: DoctorsState = {
    doctors: {
        loading: false,
        error  : null,
        success: false,
        doctors: [],
    },
    create : {
        loading: false,
        success: false,
        error  : null,
    },
};


export const reducer = createReducer(
    initialState,
    on( DoctorActions.loadDoctors,
        state => (
            {
                ...state,
                doctors: {
                    ...state.doctors,
                    loading: true,
                },
            }
        ),
    ),
    on( DoctorActions.loadingDoctorsSuccess,
        (state, { data }) => (
            {
                ...state,
                doctors: {
                    ...state.doctors,
                    loading: false,
                    doctors: data,
                    success: true,
                },
            }
        ),
    ),
    on( DoctorActions.failedToLoadDoctors,
        (state, { error }) => (
            {
                ...state,
                doctors: {
                    ...state.doctors,
                    loading: false,
                    error,
                },
            }
        ),
    ),
    on( DoctorActions.createDoctor, (state) => (
        {
            ...state,
            create: {
                loading: true,
                success: false,
                error  : null,
            },
        }
    ) ),
    on( DoctorActions.createDoctorSuccess, (state, { data }) => (
        {
            ...state,
            create: {
                loading: false,
                success: true,
                error  : null,
            },
            list  : {
                ...state.doctors,
                doctors: [ ...state.doctors.doctors, data ],
            },
        }
    ) ),
    on( DoctorActions.createDoctorFailed, (state, { error }) => (
        {
            ...state,
            create: {
                loading: false,
                success: false,
                error,
            },
        }
    ) ),
    on( DoctorActions.clearCreateDoctorStore, (state) => (
        {
            ...state,
            create: {
                ...initialState.create,
            },
        }
    ) ),
);
