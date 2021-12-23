import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentsService } from '../../config/services/departments.service';
import * as DepartmentActions from '../actions/department.actions';


@Injectable()
export class DepartmentEffects {

  loadDepartments$ = createEffect( () => {
    return this.actions$.pipe(
      ofType( DepartmentActions.loadDepartments ),
      concatMap( () =>
                   this.deptService.getAllDepartments()
                       .pipe(
                         map( data => DepartmentActions.loadDepartmentsSuccess( { data } ) ),
                         catchError( error => of( DepartmentActions.failedToLoadDepartments( { error } ) ) ) ),
      ),
    );
  } );

  createDepartment$ = createEffect( () => {
    return this.actions$.pipe(
      ofType( DepartmentActions.createDepartment ),
      concatMap( ({ data }) =>
                   this.deptService.createDepartment( data )
                       .pipe(
                         map( data => DepartmentActions.createDepartmentSuccess( { data } ) ),
                         catchError( error => of( DepartmentActions.createDepartmentFailed( { error } ) ) ) ),
      ),
    );
  } );

  constructor(
    private actions$: Actions,
    private deptService: DepartmentsService,
  ) {
  }

}
