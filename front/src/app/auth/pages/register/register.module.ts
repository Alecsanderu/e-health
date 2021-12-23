import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { RegisterFormComponent } from './page/components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    RegisterPageComponent,
    RegisterFormComponent
  ],
              imports: [
                  CommonModule,
                  RegisterRoutingModule,
                  ReactiveFormsModule,
                  SharedModule
              ]
          })
export class RegisterModule { }
