import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormFields, FormGroupTyped } from 'src/app/config/interfaces/typed-form-group.interface';
import { BaseForm } from 'src/app/config/models/base-form';
import { AppState } from '../../../../../../store/reducers';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IRegisterForm } from './register-form.interface';
import { Observable } from 'rxjs';
import { BaseHttpException } from '../../../../../../config/models/http-exceptions';
import { filter, map } from 'rxjs/operators';
import * as AuthActions from '../../../../../../store/actions/auth.actions'
import * as AuthSelectors from '../../../../../../store/selectors/auth.selectors'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends BaseForm<IRegisterForm> implements OnInit, OnDestroy {
    registerForm!: FormGroupTyped<IRegisterForm>;
    
    constructor(
        private readonly fb: FormBuilder,
        private store: Store<AppState>,
        private readonly translationService: TranslateService
    ) {
        super();
    }
    
    override ngOnInit(): void {
        super.ngOnInit();
        this.registerForm = this.createForm();
    }
    
    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.store.dispatch(AuthActions.clearRegisterErrorsAndSuccess());
    }
    
    async onSubmit(): Promise<void> {
        if( !this.registerForm.valid ) {
            this.registerForm.markAllAsTouched();
            return;
        }
        this.store.dispatch( AuthActions.registerUser( { credentials: this.registerForm.value } ) );
    }
    
    protected formInstance(): FormGroupTyped<IRegisterForm> {
        return this.registerForm;
    }
    
    protected serverErrors(): Observable<BaseHttpException<any> | null> {
        return this.store.select( AuthSelectors.errorOnRegistrations );
    }
    
    protected storeInstance(): Store<AppState> {
        return this.store;
    }
    
    protected translationInstance(): TranslateService {
        return this.translationService;
    }
    
    
    protected override successfulServerSubmission(): Observable<undefined | string> {
        return this.store.select(AuthSelectors.successfulRegistration)
                   .pipe(
                       filter( isSuccessful => isSuccessful  ),
                       map(() => 'Utilizator inregistrat')
                   );
    }
    
    
    private createForm(): FormGroupTyped<IRegisterForm> {
        
        const formFields: FormFields<IRegisterForm> = {
            email    : [ null, [ Validators.required, Validators.email ] ],
            password : [ null, [ Validators.required, Validators.minLength( 8 ) ] ],
            name: [ null, [ Validators.required ] ],
            address : [ null, [ Validators.required ] ],
            phone : [ null, [ Validators.required ] ]
        };
        
        return this.fb.group( formFields );
    }
    
}
