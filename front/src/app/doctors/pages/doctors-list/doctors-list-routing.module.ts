import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListPageComponent } from './doctors-list-page/doctors-list-page.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorsListPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsListRoutingModule { }
