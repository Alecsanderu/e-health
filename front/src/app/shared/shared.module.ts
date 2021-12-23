import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DangerButtonComponent } from './components/buttons/danger-button.component';
import { PrimaryButtonComponent } from './components/buttons/primary-button.component';
import { SecondaryButtonComponent } from './components/buttons/secondary-button.component';
import { SuccessButtonComponent } from './components/buttons/success-button.component';
import { WarningButtonComponent } from './components/buttons/warning-button.component';
import { DateInputComponent } from './components/form-inputs/date-input/date-input.component';
import { DateTimeInputComponent } from './components/form-inputs/date-time-input/date-time-input.component';
import { EmailInputComponent } from './components/form-inputs/email-input/email-input.component';
import { InputErrorsComponent } from './components/form-inputs/input-errors/input-errors.component';
import { InputWrapperComponent } from './components/form-inputs/input-wrapper/input-wrapper.component';
import { MultiSelectInputComponent } from './components/form-inputs/multi-select-input/multi-select-input.component';
import { NumberInputComponent } from './components/form-inputs/number-input/number-input.component';
import { PasswordInputComponent } from './components/form-inputs/password-input/password-input.component';
import { PhoneInputComponent } from './components/form-inputs/phone-input/phone-input.component';
import { SelectInputComponent } from './components/form-inputs/select-input/select-input.component';
import { TextInputComponent } from './components/form-inputs/text-input/text-input.component';
import { TextareaInputComponent } from './components/form-inputs/textarea-input/textarea-input.component';
import { BaseFormContainerComponent } from './components/layout/base-form-container/base-form-container.component';
import { FormTitleComponent } from './components/layout/form-title/form-title.component';
import { PageContentComponent } from './components/layout/page-content/page-content.component';
import { PageHeaderComponent } from './components/layout/page-header/page-header.component';
import { PageSubtitleComponent } from './components/layout/page-subtitle/page-subtitle.component';
import { PageTitleComponent } from './components/layout/page-title/page-title.component';
import { SectionTitleComponent } from './components/layout/section-title/section-title.component';
import { TranslateValuePipe } from './pipes/translate-value.pipe';


const Buttons = [
    PrimaryButtonComponent,
    DangerButtonComponent,
    SecondaryButtonComponent,
    SuccessButtonComponent,
    WarningButtonComponent,
];

const Pipes = [
    TranslateValuePipe,
];

const FormInputs = [
    InputErrorsComponent,
    InputWrapperComponent,
    TextInputComponent,
    PhoneInputComponent,
    PasswordInputComponent,
    EmailInputComponent,
    DateInputComponent,
    DateTimeInputComponent,
    TextareaInputComponent,
    NumberInputComponent,
    MultiSelectInputComponent,
];


const ExportComponents = [
    PageTitleComponent,
    PageSubtitleComponent,
    SectionTitleComponent,
    FormTitleComponent,
    PageHeaderComponent,
    PageContentComponent,
    BaseFormContainerComponent,
    ...Buttons,
    ...FormInputs,
    ...Pipes,
];


@NgModule( {
               declarations: [ ...ExportComponents, SelectInputComponent ],
               exports     : [ ...ExportComponents, SelectInputComponent ],
               imports: [
                   ButtonModule,
                   FormsModule,
                   InputTextModule,
                   InputMaskModule,
                   PasswordModule,
                   CalendarModule,
                   CommonModule,
                   FormsModule,
                   PaginatorModule,
                   ConfirmDialogModule,
                   ToastModule,
                   MultiSelectModule,
               ],
           } )
export class SharedModule {
}
