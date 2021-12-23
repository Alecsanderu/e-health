import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPatients from '../reducers/patient.reducer';

export const selectPatientState = createFeatureSelector<fromPatients.PatientState>(
    fromPatients.patientFeatureKey,
);


export const patientsList = createSelector(
    selectPatientState,
    (state) => state.patient.patients,
);

export const errorLoadPatients = createSelector(
    selectPatientState,
    (state) => state.patient.error,
);

export const pendingLoading = createSelector(
    selectPatientState,
    (state) => state.patient.loading,
);

export const totalPatients = createSelector(
    selectPatientState,
    (state) => state.patient.patients.length,
);

export const createPatientSuccess = createSelector(
    selectPatientState,
    (state) => state.create.success,
);

export const createPatientError = createSelector(
    selectPatientState,
    (state) => state.create.error,
);

export const createPatientLoading = createSelector(
    selectPatientState,
    (state) => state.create.loading,
);

export const checkOutPatientSuccess = createSelector(
    selectPatientState,
    (state) => state.checkOut.success,
);

export const checkOutPatientError = createSelector(
    selectPatientState,
    (state) => state.checkOut.error,
);

export const checkOutPatientLoading = createSelector(
    selectPatientState,
    (state) => state.checkOut.loading,
);
