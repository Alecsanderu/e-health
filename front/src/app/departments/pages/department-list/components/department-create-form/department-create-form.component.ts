import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FormFields, FormGroupTyped } from '../../../../../config/interfaces/typed-form-group.interface';
import { BaseForm } from '../../../../../config/models/base-form';
import { BaseHttpException } from '../../../../../config/models/http-exceptions';
import { CreateDepartmentDto } from '../../../../../dtos/create-department.dto';
import * as DepartmentActions from '../../../../../store/actions/department.actions';
import { AppState } from '../../../../../store/reducers';
import * as DepartmentSelectors from '../../../../../store/selectors/department.selectors';


@Component( {
              selector   : 'app-department-create-form',
              templateUrl: './department-create-form.component.html',
              styleUrls  : [ './department-create-form.component.scss' ],
            } )
export class DepartmentCreateFormComponent extends BaseForm<CreateDepartmentDto> implements OnInit, OnDestroy {

  form!: FormGroupTyped<CreateDepartmentDto>;
  createDeptLoading$!: Observable<boolean>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly translationService: TranslateService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.form = this.createForm();
    this.createDeptLoading$ = this.store.select( DepartmentSelectors.createDepartmentLoading );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.store.dispatch( DepartmentActions.clearCreateDepartmentStore() );
  }

  onSubmit(): void {

    if( !this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch( DepartmentActions.createDepartment( { data: this.form.value } ) );
  }


  protected formInstance(): FormGroupTyped<CreateDepartmentDto> {
    return this.form;
  }

  protected serverErrors(): Observable<BaseHttpException<any> | null> {
    return this.store.select( DepartmentSelectors.createDepartmentError );
  }

  protected storeInstance(): Store<AppState> {
    return this.store;
  }

  protected translationInstance(): TranslateService {
    return this.translationService;
  }

  protected override successfulServerSubmission(): Observable<string | undefined> {
    return this.store.select( DepartmentSelectors.createDepartmentSuccess )
               .pipe(
                 filter( isSuccess => isSuccess ),
                 tap( () => tap( x => this.store.dispatch(DepartmentActions.loadDepartments()))  ),
                 map( () => 'Departamentul a fost adaugat' ),
               );
  }

  private createForm(): FormGroupTyped<CreateDepartmentDto> {

    const formFields: FormFields<CreateDepartmentDto> = {
      name    : [ null, [ Validators.required, Validators.minLength( 2 ) ] ],
      capacity: [ null, [ Validators.required, Validators.min( 0 ) ] ],
    };

    return this.fb.group( formFields );
  }
}
