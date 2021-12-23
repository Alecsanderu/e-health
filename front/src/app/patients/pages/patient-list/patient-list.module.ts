import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/shared.module';
import { PatientCreateFormComponent } from './components/patient-create-form/patient-create-form.component';
import { PatientCreateModalComponent } from './components/patient-create-modal/patient-create-modal.component';
import { PatientsTableComponent } from './components/patients-table/patients-table.component';

import { PatientListRoutingModule } from './patient-list-routing.module';
import { PatientsListPageComponent } from './patients-list-page/patients-list-page.component';


@NgModule( {
               declarations: [
                   PatientsListPageComponent,
                   PatientsTableComponent,
                   PatientCreateModalComponent,
                   PatientCreateFormComponent,
               ],
               imports: [
                   CommonModule,
                   PatientListRoutingModule,
                   TableModule,
                   MultiSelectModule,
                   FormsModule,
                   ReactiveFormsModule,
                   SharedModule,
               ],
           } )
export class PatientListModule {
}
