import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatientsService } from '../../config/services/patients.service';
import * as PatientsActions from '../actions/patients.actions';


@Injectable()
export class PatientEffects {

    loadPatients$ = createEffect( () => {
        return this.actions$.pipe(
            ofType( PatientsActions.loadPatients ),
            concatMap( () =>
                           this.patientService.getPatients()
                               .pipe(
                                   map( data => PatientsActions.loadPatientsSuccess( { data } ) ),
                                   catchError( error => of( PatientsActions.loadPatientsFailed( { error } ) ) ) ),
            ),
        );
    } );

    createPatient$ = createEffect( () => {
        return this.actions$.pipe(
            ofType( PatientsActions.createPatient ),
            concatMap( ({ data }) =>
                           this.patientService.createPatient( data )
                               .pipe(
                                   map( data => PatientsActions.createPatientSuccess( { data } ) ),
                                   catchError( error => of( PatientsActions.createPatientFailed( { error } ) ) ) ),
            ),
        );
    } );

    checkOutPatient$ = createEffect( () => {
        return this.actions$.pipe(
            ofType( PatientsActions.checkOutPatient ),
            concatMap( ({ patientId }) =>
                           this.patientService.checkOutPatient( patientId )
                               .pipe(
                                   map( data => PatientsActions.checkOutPatientSuccess( { data } ) ),
                                   catchError( error => of( PatientsActions.checkOutPatientFailed( { error } ) ) ) ),
            ),
        );
    } );


    constructor(
        private actions$: Actions,
        private patientService: PatientsService,
    ) {
    }

}
