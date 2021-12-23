import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { enumToList } from '../../../../../config/functions/enum-to-list.function';
import { isDefined } from '../../../../../config/functions/is-defined';
import { FormFields, FormGroupTyped } from '../../../../../config/interfaces/typed-form-group.interface';
import { BaseForm } from '../../../../../config/models/base-form';
import { BaseHttpException } from '../../../../../config/models/http-exceptions';
import { CreatePatientDto } from '../../../../../dtos/create-patient.dto';
import { DepartmentDto } from '../../../../../dtos/department.dto';
import { GenderEnum } from '../../../../../dtos/gender.enum';
import { DataForSelectMenu } from '../../../../../shared/components/form-inputs/select-input/select-input.component';
import * as PatientActions from '../../../../../store/actions/patients.actions';
import { AppState } from '../../../../../store/reducers';
import * as DepartmentSelectors from '../../../../../store/selectors/department.selectors';
import * as PatientSelectors from '../../../../../store/selectors/patient.selectors';


@Component( {
                selector   : 'app-patient-create-form',
                templateUrl: './patient-create-form.component.html',
                styleUrls  : [ './patient-create-form.component.scss' ],
            } )
export class PatientCreateFormComponent extends BaseForm<CreatePatientDto> implements OnInit, OnDestroy, AfterContentChecked {

    form!: FormGroupTyped<CreatePatientDto>;
    createPatientLoading$!: Observable<boolean>;
    departmentOptions$!: Observable<DataForSelectMenu[]>;
    genderOptions$!: Observable<DataForSelectMenu[]>;

    constructor(
        private readonly fb: FormBuilder,
        private readonly store: Store<AppState>,
        private readonly translationService: TranslateService,
        private cdref: ChangeDetectorRef,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.form = this.createForm();
        this.departmentOptions$ = this.store.select( DepartmentSelectors.departments )
                                      .pipe(
                                          filter( isDefined ),
                                          map( this.mapDepartmentToDataForSelectButton ) );
        this.createPatientLoading$ = this.store.select( PatientSelectors.createPatientLoading );
        this.genderOptions$ = enumToList( GenderEnum, 'GenderEnum', this.translationService );
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.store.dispatch( PatientActions.clearCreatePatientStore() );
    }

    ngAfterContentChecked(): void {
        this.cdref.detectChanges();
    }

    onSubmit(): void {

        if( !this.form.valid ) {
            this.form.markAllAsTouched();
            return;
        }

        this.store.dispatch( PatientActions.createPatient( { data: this.form.value } ) );
    }

    mapDepartmentToDataForSelectButton(data: DepartmentDto[]) {
        return data.map( item => (
            { value: item.id, label: item.name }
        ) );
    }


    protected formInstance(): FormGroupTyped<CreatePatientDto> {
        return this.form;
    }

    protected serverErrors(): Observable<BaseHttpException<any> | null> {
        return this.store.select( PatientSelectors.createPatientError );
    }

    protected storeInstance(): Store<AppState> {
        return this.store;
    }

    protected translationInstance(): TranslateService {
        return this.translationService;
    }

    protected override successfulServerSubmission(): Observable<string | undefined> {
        return this.store.select( PatientSelectors.createPatientSuccess )
                   .pipe(
                       filter( isSuccess => isSuccess ),
                       map( () => 'Pacientul a fost adaugat' ),
                   );
    }

    private createForm(): FormGroupTyped<CreatePatientDto> {

        const formFields: FormFields<CreatePatientDto> = {
            fullName        : [ null, [ Validators.required, Validators.minLength( 4 ) ] ],
            address         : [ null, [ Validators.required, Validators.minLength( 10 ) ] ],
            contact         : [ null, [ Validators.required ] ],
            emergencyContact: [ null ],
            dob             : [ null, [ Validators.required ] ],
            gender          : [ null, [ Validators.required ] ],
            diagnostic      : [ null, [ Validators.required ] ],
            checkOutDate    : [ null ],
            departmentId    : [ null, [ Validators.required ] ],

        };

        return this.fb.group( formFields );

    }
}
