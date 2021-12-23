import { Routes } from '@angular/router';
import { AppR } from '../../config/routes';

export const SECURE_ROUTES: Routes = [
  {
    path        : AppR.dashboard.from.appConfig,
    loadChildren: () => import('../../dashboard/dashboard.module').then( m => m.DashboardModule ),
  },
  {
    path        : AppR.doctors.from.config,
    loadChildren: () => import('../../doctors/pages').then( m => m.DoctorsListModule ),
  },
  {
    path        : AppR.departments.from.config,
    loadChildren: () => import('../../departments/pages').then( m => m.DepartmentListModule ),
  },
    {
        path        : AppR.patients.from.config,
        loadChildren: () => import('../../patients/pages').then( m => m.PatientListModule  ),
    },
];
