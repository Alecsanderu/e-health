import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromDepartments from './departments.reducer';
import * as fromDoctors from './doctors.reducer';
import * as fromGui from './gui.reducer';
import * as fromPatients from './patient.reducer';

export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromGui.guiFeatureKey]: fromGui.GuiState;
  [fromDoctors.doctorsFeatureKey]: fromDoctors.DoctorsState;
  [fromPatients.patientFeatureKey]: fromPatients.PatientState;
  [fromDepartments.departmentFeatureKey]: fromDepartments.DepartmentState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]             : fromAuth.reducer,
  [fromGui.guiFeatureKey]               : fromGui.reducer,
  [fromDoctors.doctorsFeatureKey]       : fromDoctors.reducer,
  [fromDepartments.departmentFeatureKey]: fromDepartments.reducer,
  [fromPatients.patientFeatureKey]      : fromPatients.reducer,

};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync( {
                             keys     : [
                               {
                                 [fromAuth.authFeatureKey]: {
                                   encrypt: data => btoa( unescape( encodeURIComponent( data ) ) ),
                                   decrypt: data => decodeURIComponent( escape( atob( data ) ) ),
                                 },
                               },
                               {
                                 [fromGui.guiFeatureKey]: {
                                   encrypt: data => btoa( unescape( encodeURIComponent( data ) ) ),
                                   decrypt: data => decodeURIComponent( escape( atob( data ) ) ),
                                 },
                               },
                               {
                                 [fromDoctors.doctorsFeatureKey]: {
                                   encrypt: data => btoa( unescape( encodeURIComponent( data ) ) ),
                                   decrypt: data => decodeURIComponent( escape( atob( data ) ) ),
                                 },
                               },
                               {
                                 [fromDepartments.departmentFeatureKey]: {
                                   encrypt: data => btoa( unescape( encodeURIComponent( data ) ) ),
                                   decrypt: data => decodeURIComponent( escape( atob( data ) ) ),
                                 },
                               },
                             ],
                             rehydrate: true,
                             storage  : sessionStorage,
                           } )( reducer );
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
                                                     ? [ localStorageSyncReducer ]
                                                     : [ localStorageSyncReducer ];
