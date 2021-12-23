import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListPageComponent } from './department-list-page/department-list-page.component';

const routes: Routes = [
  {
    path     : '',
    component: DepartmentListPageComponent,
  },
];

@NgModule( {
             imports: [ RouterModule.forChild( routes ) ],
             exports: [ RouterModule ],
           } )
export class DepartmentListRoutingModule {
}
