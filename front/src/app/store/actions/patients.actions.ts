import { createAction, props } from '@ngrx/store';
import { CreatePatientDto } from '../../dtos/create-patient.dto';
import { PatientDto } from '../../dtos/patient.dto';

export const loadPatients = createAction(
    '[Patient List] Loading Patients',
);

export const loadPatientsFailed = createAction(
    '[Patient List] Failed To Load Activation Request',
    props<{ error: any }>(),
);

export const loadPatientsSuccess = createAction(
    '[Patient List] Success Loading Patients',
    props<{ data: PatientDto[] }>(),
);

export const createPatient = createAction(
    '[Patient List] Create Patient',
    props<{ data: CreatePatientDto }>(),
);

export const createPatientSuccess = createAction(
    '[Patient List] Create Patient Success',
    props<{ data: PatientDto }>(),
);

export const createPatientFailed = createAction(
    '[Patient List] Create Patient Failed',
    props<{ error: any }>(),
);

export const clearCreatePatientStore = createAction(
    '[Patient Create Form] Clear Create Patient Store',
);

export const checkOutPatient = createAction(
    '[Patient List] Check Out Patient',
    props<{ patientId: string }>(),
);

export const checkOutPatientSuccess = createAction(
    '[Patient List] Check Out Patient Success',
    props<{ data: PatientDto }>(),
);

export const checkOutPatientFailed = createAction(
    '[Patient List] Check Out Patient Failed',
    props<{ error: any }>(),
);

export const clearCheckOutPatient = createAction(
    '[Patient List] Clear Check Out Patient Store',
);

