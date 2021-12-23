import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash-es';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppState } from '../../store/reducers';
import { BadRequestException, BaseHttpException, ForbiddenError, UnauthorizedError } from './http-exceptions';
import { isDefined } from '../functions/is-defined';
import * as GuiActions from '../../store/actions/gui.actions'
import { FormGroupTyped } from '../interfaces/typed-form-group.interface';



@Directive()
export abstract class BaseForm<T> implements OnInit, OnDestroy, AfterViewInit {
    displaySaveButton = false;
    private subscriptions: Subscription = new Subscription();
    private initialFormValues!: T;
    private _formChanged = false;
    private editState = false;
    private _confirmationService?: ConfirmationService;
    private _messageService?: MessageService;

    protected constructor(
        confirmationService?: ConfirmationService,
        messageService?: MessageService) {
        this._confirmationService = confirmationService;
        this._messageService = messageService;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnInit(): void {
        this.subscriptions.add( this.subscribeForServerErrors() );
        this.subscriptions.add( this.subscribeForServerSuccess() );
    }

    ngAfterViewInit(): void {
        this.subscriptions.add( this.subscribeForFormChanges() );
        this.initialFormValues = this.formInstance().value;
    }

    toggleInputs(): void {
        if( this.formChanged() && this.editState ) {
            this.confirmEdit();
            return;
        }
        this.toggleInputDisabledStatus();

    }

    confirmEdit(): void {
        if( isNil( this._confirmationService ) ) {
            return;
        }
        this._confirmationService.confirm( {
                                               message: 'Nu ati salvat modificarile. Continuati?',
                                               header : 'Confirmare',
                                               icon   : 'pi pi-exclamation-triangle',
                                               accept : () => {
                                                   if( isNil( this._messageService ) ) {
                                                       return;
                                                   }
                                                   this._messageService.add( {
                                                                                 severity: 'info',
                                                                                 summary : 'Modificarile nu au fost salvate'
                                                                             } );
                                                   this.toggleInputDisabledStatus();
                                                   this.restoreInitialValues();
                                               },
                                               reject : (types: any) => {
                                                   switch(types) {
                                                       case ConfirmEventType.REJECT:
                                                           return;
                                                   }
                                               }
                                           } );
    }

    formChanged(): boolean {
        return this._formChanged;
    }

    restoreInitialValues(): void {
        this.formInstance()
            .patchValue( { ...this.initialFormValues } );

        this.formInstance()
            .markAsUntouched();

        this._formChanged = false;
    }

    protected abstract serverErrors(): Observable<BaseHttpException<any> | null>;

    protected abstract formInstance(): FormGroupTyped<T>;

    protected abstract translationInstance(): TranslateService;

    protected abstract storeInstance(): Store<AppState>;

    protected successfulServerSubmission(): Observable<undefined | string> {
        return of( undefined );
    }

    private toggleInputDisabledStatus(): void {

        Object.values( this.formInstance().controls )
              .forEach( value => value.disabled
                                 ? value.enable()
                                 : value.disable() );

        this.displaySaveButton = !this.displaySaveButton;
        this.editState = !this.editState;
    }


    private subscribeForFormChanges(): Subscription {
        return this.formInstance()
                   .valueChanges
                   .subscribe( () => this._formChanged = true );
    }

    private subscribeForServerErrors(): Subscription {
        return this.serverErrors()
                   .pipe( filter( error => !isNil( error ) ) )
                   .subscribe( async (error) => {
                       let title = await this.translationInstance()
                                             .get( 'E.BASE_ERROR.TITLE' )
                                             .toPromise();
                       let body = await this.translationInstance()
                                            .get( 'E.BASE_ERROR.BODY' )
                                            .toPromise();

                       if( error instanceof BadRequestException && !isNil( error.data ) ) {
                           const formFields = this.getFormFields( this.formInstance() );
                           console.log( formFields );
                           error.data.message.forEach( e => {
                               if( e.field
                                   && Object.keys( formFields )
                                            .includes( e.field )
                                   && this.formInstance()
                                          .get( formFields[e.field] )
                               ) {
                                   this.formInstance()
                                       .get( formFields[e.field] )!.setErrors( { [e.name]: e.message } );

                               }
                           } );

                           title = await this.translationInstance()
                                             .get( `E.BAD_REQUEST.${ error.data.message[0].name }` )
                                             .toPromise();
                           body = await this.translationInstance()
                                            .get( 'E.BAD_REQUEST.BODY' )
                                            .toPromise();
                       } else if( error instanceof UnauthorizedError ) {

                           title = await this.translationInstance()
                                             .get( 'E.UNAUTHORIZED_ERROR.TITLE' )
                                             .toPromise();
                           body = await this.translationInstance()
                                            .get( 'E.UNAUTHORIZED_ERROR.BODY' )
                                            .toPromise();
                       } else if( error instanceof ForbiddenError ) {

                           title = await this.translationInstance()
                                             .get( 'E.FORBIDDEN_ERROR.TITLE' )
                                             .toPromise();
                           body = await this.translationInstance()
                                            .get( 'E.FORBIDDEN_ERROR.BODY' )
                                            .toPromise();
                       }

                       this.storeInstance()
                           .dispatch( GuiActions.displayToastError( { title, body } ) );
                   } );
    }

    private subscribeForServerSuccess(): Subscription {

        return this.successfulServerSubmission()
                   .pipe(
                       filter( isDefined ),
                       tap( () => {
                           this.formInstance()
                               .disable();
                           this.initialFormValues = this.formInstance().value;
                           this.displaySaveButton = false;
                           this.editState = false;
                       } )
                   )
                   .subscribe( successMessage => {
                                   const title = 'Success';
                                   this.storeInstance()
                                       .dispatch( GuiActions.displayToastSuccess( { title, body: successMessage } ) );
                               }
                   );
    }

    private getFormFields(form: FormGroup, acc: Record<string, string> = {}, parentGroupList: string[] = []): Record<string, string> {

        const formControlNames = Object.keys( form.controls );

        formControlNames.forEach( controlName => {
            const formControl = form.controls[controlName];

            if( formControl instanceof FormGroup ) {
                this.getFormFields( formControl, acc, [ ...parentGroupList, controlName ] );
            } else {
                acc[controlName] = [ ...parentGroupList, controlName ].join( '.' );
            }
        } );

        return acc;
    }
}
