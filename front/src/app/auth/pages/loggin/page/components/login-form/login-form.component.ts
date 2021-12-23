import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm } from '../../../../../../config/models/base-form';
import { ILoginForm } from './login-form.interface';
import { FormFields, FormGroupTyped } from '../../../../../../config/interfaces/typed-form-group.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducers';
import { TranslateService } from '@ngx-translate/core';
import * as AuthActions from '../../../../../../store/actions/auth.actions'
import * as AuthSelectors from '../../../../../../store/selectors/auth.selectors'
import { Observable } from 'rxjs';
import { BaseHttpException } from '../../../../../../config/models/http-exceptions';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseForm<ILoginForm> implements OnInit, OnDestroy {
    loginForm!: FormGroupTyped<ILoginForm>;
    
    constructor(
        private readonly fb: FormBuilder,
        private readonly store: Store<AppState>,
        private readonly translationService: TranslateService
    ) {
        super();
    }
    
    override ngOnInit(): void {
        super.ngOnInit();
        this.loginForm = this.createForm();
    }
    
    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.store.dispatch(AuthActions.clearAuthErrorsAndSuccess());
    }
    
    async onSubmit(): Promise<void> {
        if( !this.loginForm.valid ) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.store.dispatch( AuthActions.login( { credentials: this.loginForm.value } ) );
    }
    
    
    
    protected formInstance(): FormGroupTyped<ILoginForm> {
        return this.loginForm;
    }
    
    protected serverErrors(): Observable<BaseHttpException<any> | null> {
        return this.store.select( AuthSelectors.loggInError);
    }
    
    protected storeInstance(): Store<AppState> {
        return this.store;
    }
    
    protected translationInstance(): TranslateService {
        return this.translationService;
    }
    
    protected override successfulServerSubmission(): Observable<string | undefined> {
        return this.store.select(AuthSelectors.isLoggedIn)
                   .pipe(
                       filter(isSuccess => isSuccess ),
                       map( () => 'Autentificare reusita' )
                   );
    }
    
    private createForm(): FormGroupTyped<ILoginForm> {
        
        const formFields: FormFields<ILoginForm> = {
            email   : [ null, [ Validators.required, Validators.email ] ],
            password: [ null, [ Validators.required, Validators.minLength( 8 ) ] ]
        };
        
        return this.fb.group( formFields );
    }
}
