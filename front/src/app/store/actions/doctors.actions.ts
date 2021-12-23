import { createAction, props } from '@ngrx/store';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { DoctorDto } from '../../dtos/doctor.dto';

export const loadDoctors = createAction(
    '[Doctors List] Loading Doctors',
);

export const failedToLoadDoctors = createAction(
    '[Doctors List] Failed To Load Activation Request',
    props<{ error: any }>(),
);

export const loadingDoctorsSuccess = createAction(
    '[Doctors List] Success Loading Doctors',
    props<{ data: DoctorDto[] }>(),
);

export const createDoctor = createAction(
    '[Doctor List] Create Doctor',
    props<{ data: CreateDoctorDto }>(),
);

export const createDoctorSuccess = createAction(
    '[Doctor List] Create Doctor Success',
    props<{ data: DoctorDto }>(),
);

export const createDoctorFailed = createAction(
    '[Doctor List] Create Doctor Failed',
    props<{ error: any }>(),
);

export const clearCreateDoctorStore = createAction(
    '[Doctor Create Form] Clear Create Doctor Store',
);
