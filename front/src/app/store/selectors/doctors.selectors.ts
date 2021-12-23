import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDoctors from '../reducers/doctors.reducer';


export const selectDoctorState = createFeatureSelector<fromDoctors.DoctorsState>(
    fromDoctors.doctorsFeatureKey,
);


export const doctors = createSelector(
    selectDoctorState,
    (state) => state.doctors.doctors,
);

export const errorLoadDoctors = createSelector(
    selectDoctorState,
    (state) => state.doctors.error,
);

export const loadingGetDoctors = createSelector(
    selectDoctorState,
    (state) => state.doctors.loading,
);

export const totalDoctors = createSelector(
    selectDoctorState,
    (state) => state.doctors.doctors.length,
);

export const createDoctorSuccess = createSelector(
    selectDoctorState,
    (state) => state.create.success,
);

export const createDoctorError = createSelector(
    selectDoctorState,
    (state) => state.create.error,
);

export const createDoctorLoading = createSelector(
    selectDoctorState,
    (state) => state.create.loading,
);
