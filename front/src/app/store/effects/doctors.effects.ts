import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DoctorsService } from '../../config/services/doctors.service';
import * as DoctorActions from '../actions/doctors.actions';


@Injectable()
export class DoctorsEffects {

    loadDoctors$ = createEffect( () => {
        return this.actions$.pipe(
            ofType( DoctorActions.loadDoctors ),
            concatMap( () =>
                           this.doctorService.getAllDoctors()
                               .pipe(
                                   map( data => DoctorActions.loadingDoctorsSuccess( { data } ) ),
                                   catchError( error => of( DoctorActions.failedToLoadDoctors( { error } ) ) ) ),
            ),
        );
    } );

    createDoctor$ = createEffect( () => {
        return this.actions$.pipe(
            ofType( DoctorActions.createDoctor ),
            concatMap( ({ data }) =>
                           this.doctorService.createDoctor( data )
                               .pipe(
                                   map( data => DoctorActions.createDoctorSuccess( { data } ) ),
                                   catchError( error => of( DoctorActions.createDoctorFailed( { error } ) ) ) ),
            ),
        );
    } );

    constructor(
        private actions$: Actions,
        private doctorService: DoctorsService,
    ) {
    }

}
