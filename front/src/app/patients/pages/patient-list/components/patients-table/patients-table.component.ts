import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as PatientActions from '../../../../../store/actions/patients.actions';
import { AppState } from '../../../../../store/reducers';
import * as PatientSelectors from '../../../../../store/selectors/patient.selectors';
import { PatientCreateModalComponent } from '../patient-create-modal/patient-create-modal.component';
import { IPatient } from './patient.interface';
import { mapPatientDtoListToIPatientList } from './patient.mappers';

@Component( {
                selector   : 'app-patients-table',
                templateUrl: './patients-table.component.html',
                styleUrls  : [ './patients-table.component.scss' ],
                providers  : [ DialogService ],
            } )
export class PatientsTableComponent implements OnInit, OnDestroy {


    cols!: any[];

    _selectedColumns!: any[];

    loadingData$!: Observable<boolean>;
    patients$!: Observable<IPatient[]>;
    totalRecords$!: Observable<number>;
    ref?: DynamicDialogRef;
    subscription: Subscription = new Subscription();
    checkOutPatientLoading$!: Observable<boolean>;

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter( col => val.includes( col ) );
    }

    constructor(
        private readonly store: Store<AppState>,
        public dialogService: DialogService,
        private readonly messageService: MessageService,
    ) {
        this.loadingData$ = this.store.select( PatientSelectors.pendingLoading );
        this.totalRecords$ = this.store.select( PatientSelectors.totalPatients );
        this.patients$ = this.store.select( PatientSelectors.patientsList )
                             .pipe( map( mapPatientDtoListToIPatientList ) );
        this.subscription.add( this.subscribeForCreatePatientSuccess() );
        this.subscription.add( this.subscribeForCheckOutPatientSuccess() );
        this.checkOutPatientLoading$ = this.store.select( PatientSelectors.checkOutPatientLoading );
    }

    ngOnInit(): void {
        this.store.dispatch( PatientActions.loadPatients() );

        this.cols = [
            { field: 'fullName', header: 'Nume' },
            { field: 'address', header: 'Adresa' },
            { field: 'contact', header: 'Contact' },
            { field: 'emergencyContact', header: 'Contact de Urgenta' },
            { field: 'dob', header: 'Data Nasterii' },
            { field: 'gender', header: 'Sexul' },
            { field: 'diagnostic', header: 'Diagnostic' },
            { field: 'checkInDate', header: 'Internare' },
            { field: 'checkOutDate', header: 'Externare' },

        ];

        this._selectedColumns = this.cols;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    openDoctorCreateModal() {
        this.ref = this.dialogService.open( PatientCreateModalComponent, {
            header: 'Adauga un pacient',
            width : '50%',
        } );
    }

    checkOutPatient(patientId: string): void {
        this.store.dispatch( PatientActions.checkOutPatient( { patientId } ) );
    }

    private subscribeForCreatePatientSuccess(): Subscription {
        return this.store.select( PatientSelectors.createPatientSuccess )
                   .subscribe( isSuccess => {
                       if( isSuccess ) {
                           this.ref?.close();
                           this.store.dispatch( PatientActions.loadPatients() );
                       }
                   } );
    }

    private subscribeForCheckOutPatientSuccess(): Subscription {
        return this.store.select( PatientSelectors.checkOutPatientSuccess )
                   .subscribe( isSuccess => {
                       if( isSuccess ) {
                           this.messageService.add( { summary: 'Succes', detail: 'Pacient externat', severity: 'success' } );
                           this.store.dispatch( PatientActions.loadPatients() );
                       }
                   } );
    }

}
