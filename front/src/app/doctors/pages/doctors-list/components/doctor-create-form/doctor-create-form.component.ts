import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { enumToList } from '../../../../../config/functions/enum-to-list.function';
import { FormFields, FormGroupTyped } from '../../../../../config/interfaces/typed-form-group.interface';
import { BaseForm } from '../../../../../config/models/base-form';
import { BaseHttpException } from '../../../../../config/models/http-exceptions';
import { CreateDoctorDto, WeekDayEnum, WorkShiftEnum } from '../../../../../dtos/create-doctor.dto';
import { DataForSelectMenu } from '../../../../../shared/components/form-inputs/select-input/select-input.component';
import * as DoctorActions from '../../../../../store/actions/doctors.actions';
import { AppState } from '../../../../../store/reducers';
import * as DoctorSelectors from '../../../../../store/selectors/doctors.selectors';
import * as DepartmentActions from '../../../../../store/actions/department.actions';
import * as DepartmentSelectors from '../../../../../store/selectors/department.selectors';
import { isDefined } from '../../../../../config/functions/is-defined';
import { DepartmentDto } from '../../../../../dtos/department.dto';


@Component( {
                selector   : 'app-doctor-create-form',
                templateUrl: './doctor-create-form.component.html',
                styleUrls  : [ './doctor-create-form.component.scss' ],
            } )
export class DoctorCreateFormComponent extends BaseForm<CreateDoctorDto> implements OnInit, OnDestroy, AfterContentChecked {

    form!: FormGroupTyped<CreateDoctorDto>;
    createDoctorLoading$!: Observable<boolean>;
    workShiftOptions$!: Observable<DataForSelectMenu[]>;
    weekDayOptions$!: Observable<DataForSelectMenu[]>;
    departmentOptions$!: Observable<DataForSelectMenu[]>
    

    constructor(
        private readonly fb: FormBuilder,
        private readonly store: Store<AppState>,
        private readonly translationService: TranslateService,
        private cdref: ChangeDetectorRef
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.form = this.createForm();
        this.store.dispatch( DepartmentActions.loadDepartments() )
        this.departmentOptions$ = this.store.select( DepartmentSelectors.departments)
            .pipe(
                filter(isDefined),
                map( this.mapDepartmentToDataForSelectButton  ));
        this.createDoctorLoading$ = this.store.select( DoctorSelectors.createDoctorLoading );
        this.workShiftOptions$ = enumToList( WorkShiftEnum, 'WorkShiftEnum', this.translationService );
        this.weekDayOptions$ = enumToList( WeekDayEnum, 'WeekDayEnum', this.translationService );
        this.weekDayOptions$ = enumToList( WeekDayEnum, 'WeekDayEnum', this.translationService );
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.store.dispatch( DoctorActions.clearCreateDoctorStore() );
    }
    
    ngAfterContentChecked(): void {
        this.cdref.detectChanges();
    }
    
    onSubmit(): void {

        if( !this.form.valid ) {
            this.form.markAllAsTouched();
            return;
        }

        this.store.dispatch( DoctorActions.createDoctor( { data: this.form.value } ) );
    }


    protected formInstance(): FormGroupTyped<CreateDoctorDto> {
        return this.form;
    }

    protected serverErrors(): Observable<BaseHttpException<any> | null> {
        return this.store.select( DoctorSelectors.createDoctorError );
    }

    protected storeInstance(): Store<AppState> {
        return this.store;
    }

    protected translationInstance(): TranslateService {
        return this.translationService;
    }

    protected override successfulServerSubmission(): Observable<string | undefined> {
        return this.store.select( DoctorSelectors.createDoctorSuccess )
                   .pipe(
                       filter( isSuccess => isSuccess ),
                       map( () => 'Doctorul a fost adaugat' ),
                   );
    }

    private createForm(): FormGroupTyped<CreateDoctorDto> {

        const formFields: FormFields<CreateDoctorDto> = {
            fullName     : [ null, [ Validators.required, Validators.minLength( 4 ) ] ],
            qualification: [ null, [ Validators.required, Validators.minLength( 2 ) ] ],
            phone        : [ null, [ Validators.required ] ],
            workingDays  : [ null, [ Validators.required ] ],
            workShift    : [ null, [ Validators.required ] ],
            departmentId : [ null, [ Validators.required ] ],
            
        };

        return this.fb.group( formFields );
        
    }
    
    mapDepartmentToDataForSelectButton( data: DepartmentDto[] ) {
        return data.map( item => ({ value: item.id, label: item.name }));
    }
}
