import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TreeNode } from 'primeng/api';
import { Observable, switchMap } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isDefined } from '../../../../../config/functions/is-defined';
import { DepartmentDto } from '../../../../../dtos/department.dto';
import { UserDto } from '../../../../../dtos/user.dto';
import { AppState } from '../../../../../store/reducers';
import * as AuthSelectors from '../../../../../store/selectors/auth.selectors';
import * as DeptSelectors from '../../../../../store/selectors/department.selectors';

@Component( {
              selector   : 'app-department-org-chart',
              templateUrl: './department-org-chart.component.html',
              styleUrls  : [ './department-org-chart.component.scss' ],
            } )
export class DepartmentOrgChartComponent implements OnInit {

  loggedInUser$!: Observable<UserDto>;
  departments$!: Observable<DepartmentDto[]>;
  departmentsLoading$!: Observable<boolean>;
  orgChartData$!: Observable<TreeNode[]>;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select( AuthSelectors.loggedInUser )
                             .pipe( filter( isDefined ) );
    this.departments$ = this.store.select( DeptSelectors.departments );
    this.departmentsLoading$ = this.store.select( DeptSelectors.departmentsLoading );
    this.orgChartData$ = this.buildOrgChartData();
  }

  private buildOrgChartData(): Observable<TreeNode[]> {
    return this.loggedInUser$
               .pipe(
                 switchMap(
                   user => this.departments$
                               .pipe(
                                 map( departments => (
                                   [
                                     {
                                       label   : user.name,
                                       expanded: true,
                                       children: [
                                         ...departments.map( dept => (
                                           {
                                             label     : dept.name,
                                             type      : 'dept',
                                             styleClass: 'dept',
                                             expanded  : false,
                                             children  : [
                                               {
                                                 label   : 'Doctori',
                                                 expanded: false,
                                                 children: [
                                                   ...dept.doctors.map( doc => (
                                                     { label: doc.fullName, type: 'doctor', styleClass: 'doctor' }
                                                   ) ),
                                                 ],
                                               },
                                               {
                                                 label   : 'Pacienti',
                                                 expanded: false,
                                                 children: [
                                                   ...dept.patients.map( p => (
                                                     { label: p.fullName, type: 'patient', styleClass: 'patient' }
                                                   ) ),
                                                 ],
                                               },
                                             ],
                                           }
                                         ) ),
                                       ],
                                     },
                                   ]
                                 ) ),
                               ),
                 ),
               );
  }

}
