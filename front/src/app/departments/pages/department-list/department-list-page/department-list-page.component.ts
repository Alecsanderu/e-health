import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import * as DepartmentActions from '../../../../store/actions/department.actions';
import { AppState } from '../../../../store/reducers';
import * as DepartmentSelectors from '../../../../store/selectors/department.selectors';
import { DepartmentCreateModalComponent } from '../components/department-create-modal/department-create-modal.component';

@Component( {
                selector   : 'app-department-list-page',
                templateUrl: './department-list-page.component.html',
                styleUrls  : [ './department-list-page.component.scss' ],
                providers  : [ DialogService ],
            } )
export class DepartmentListPageComponent implements OnInit, OnDestroy {

    ref?: DynamicDialogRef;
    subscription!: Subscription;

    constructor(
        private readonly store: Store<AppState>,
        public dialogService: DialogService,
    ) {
        this.subscription = new Subscription();
    }

    openCreateDeptModal(): void {
        this.ref = this.dialogService.open( DepartmentCreateModalComponent, {
            header: 'Creeaza departament',
            width : '50%',
        } );
    }

    ngOnInit(): void {
        this.store.dispatch( DepartmentActions.loadDepartments() );
        this.subscription.add( this.subscribeForCreateDeptSuccess() );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private subscribeForCreateDeptSuccess(): Subscription {
        return this.store.select( DepartmentSelectors.createDepartmentSuccess )
                   .subscribe( isSuccess => {
                       if( isSuccess ) {
                           this.ref?.close();
                       }
                   } );
    }
}
