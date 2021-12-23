import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListPageComponent } from './patients-list-page/patients-list-page.component';

const routes: Routes = [
    {
        path: '',
        component: PatientsListPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientListRoutingModule { }
