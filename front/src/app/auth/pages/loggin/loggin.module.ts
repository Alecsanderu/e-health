import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogginRoutingModule } from './loggin-routing.module';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { LoginFormComponent } from './page/components/login-form/login-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent
  ],
              imports: [
                  CommonModule,
                  LogginRoutingModule,
                  SharedModule,
                  ReactiveFormsModule
              ]
          })
export class LogginModule { }
