import { createReducer, on } from '@ngrx/store';
import { PatientDto } from '../../dtos/patient.dto';
import * as PatientActions from '../actions/patients.actions';


export const patientFeatureKey = 'patient';

export interface PatientState {
    patient: {
        loading: boolean;
        error: any
        success: boolean;
        patients: PatientDto[];
    };
    create: {
        loading: boolean;
        error: any;
        success: boolean
    };
    checkOut: {
        loading: boolean;
        error: any;
        success: boolean
    };

}

export const initialState: PatientState = {
    patient : {
        loading : false,
        error   : null,
        success : false,
        patients: [],
    },
    create  : {
        loading: false,
        error  : null,
        success: false,
    },
    checkOut: {
        loading: false,
        error  : null,
        success: false,
    },
};

export const reducer = createReducer(
    initialState,
    on( PatientActions.loadPatients,
        state => (
            {
                ...state,
                patient: {
                    ...state.patient,
                    loading: true,
                },
            }
        ) ),
    on( PatientActions.loadPatientsSuccess,
        (state, { data }) => (
            {
                ...state,
                patient: {
                    ...state.patient,
                    loading : false,
                    patients: data,
                    success : true,
                },
            }
        ),
    ),
    on( PatientActions.loadPatientsFailed,
        (state, { error }) => (
            {
                ...state,
                patient: {
                    ...state.patient,
                    loading: false,
                    error,
                },
            }
        ),
    ),
    on( PatientActions.createPatient, (state) => (
        {
            ...state,
            create: {
                loading: true,
                success: false,
                error  : null,
            },
        }
    ) ),
    on( PatientActions.createPatientSuccess, (state, { data }) => (
        {
            ...state,
            create : {
                loading: false,
                success: true,
                error  : null,
            },
            patient: {
                ...state.patient,
                patients: [ ...state.patient.patients, data ],
            },
        }
    ) ),
    on( PatientActions.createPatientFailed, (state, { error }) => (
        {
            ...state,
            create: {
                loading: false,
                success: false,
                error,
            },
        }
    ) ),
    on( PatientActions.clearCreatePatientStore, (state) => (
        {
            ...state,
            create: {
                ...initialState.create,
            },
        }
    ) ),
    on( PatientActions.checkOutPatient, (state) => (
        {
            ...state,
            checkOut: {
                loading: true,
                success: false,
                error  : null,
            },
        }
    ) ),
    on( PatientActions.checkOutPatientSuccess, (state, { data }) => (
        {
            ...state,
            checkOut: {
                loading: false,
                success: true,
                error  : null,
            },
            patient : {
                ...state.patient,
                patients: [ ...state.patient.patients, data ],
            },
        }
    ) ),
    on( PatientActions.checkOutPatientFailed, (state, { error }) => (
        {
            ...state,
            checkOut: {
                loading: false,
                success: false,
                error,
            },
        }
    ) ),
    on( PatientActions.clearCheckOutPatient, (state) => (
        {
            ...state,
            checkOut: {
                ...initialState.create,
            },
        }
    ) ),
);
