import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { DoctorDto } from '../../../../../dtos/doctor.dto';
import * as DoctorsActions from '../../../../../store/actions/doctors.actions';
import { AppState } from '../../../../../store/reducers';
import * as DoctorsSelectors from '../../../../../store/selectors/doctors.selectors';
import { DoctorScheduleComponent } from '../doctor-schedule/doctor-schedule.component';
import { DoctorCreateModalComponent } from '../doctor-create-modal/doctor-create-modal.component';

@Component( {
                selector   : 'app-doctors-table',
                templateUrl: './doctors-table.component.html',
                styleUrls  : [ './doctors-table.component.scss' ],
                providers  : [ DialogService ],
            } )
export class DoctorsTableComponent implements OnInit {

    loadingData$!: Observable<boolean>;
    doctors$!: Observable<DoctorDto[]>;
    totalRecords$!: Observable<number>;
    ref?: DynamicDialogRef;
    subscription: Subscription = new Subscription();


    constructor(
        private readonly store: Store<AppState>,
        public dialogService: DialogService,
    ) {
        this.loadingData$ = this.store.select( DoctorsSelectors.loadingGetDoctors );
        this.totalRecords$ = this.store.select( DoctorsSelectors.totalDoctors );
        this.doctors$ = this.store.select( DoctorsSelectors.doctors );
    }

    ngOnInit(): void {
        this.store.dispatch( DoctorsActions.loadDoctors() );
        this.subscription.add( this.subscribeForCreateDoctorSuccess() );
    }

    openDoctorSchedule() {
        this.dialogService.open( DoctorScheduleComponent, {
            header: 'Program',
            width : '100%',
        } );
    }

    openDoctorCreateModal() {
        this.ref = this.dialogService.open( DoctorCreateModalComponent, {
            header: 'Adauga un doctor',
            width : '50%',
        } );
    }

    private subscribeForCreateDoctorSuccess(): Subscription {
        return this.store.select( DoctorsSelectors.createDoctorSuccess )
                   .subscribe( isSuccess => {
                       if( isSuccess ) {
                           console.log('merge')
                           this.ref?.close();
                           this.store.dispatch( DoctorsActions.loadDoctors() );
                       }
                   } );
    }

}
