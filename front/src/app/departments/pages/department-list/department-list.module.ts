import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SharedModule } from '../../../shared/shared.module';
import { DepartmentCreateFormComponent } from './components/department-create-form/department-create-form.component';
import { DepartmentCreateModalComponent } from './components/department-create-modal/department-create-modal.component';
import { DepartmentOrgChartComponent } from './components/department-org-chart/department-org-chart.component';
import { DepartmentListPageComponent } from './department-list-page/department-list-page.component';
import { DepartmentListRoutingModule } from './department-list-routing.module';


@NgModule( {
             declarations: [
               DepartmentListPageComponent,
               DepartmentOrgChartComponent,
               DepartmentCreateModalComponent,
               DepartmentCreateFormComponent,
             ],
             imports: [
               CommonModule,
               DepartmentListRoutingModule,
               SharedModule,
               DataViewModule,
               InputTextModule,
               ButtonModule,
               OrganizationChartModule,
               ReactiveFormsModule,
             ],
           } )
export class DepartmentListModule {
}
