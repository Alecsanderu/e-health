import { Routes } from '@angular/router';
import { AppR } from '../../config/routes';

export const PUBLIC_ROUTES: Routes = [
  {
    path        : AppR.login.from.config,
    loadChildren: () => import('../../auth').then( m => m.LogginModule )
  },
  {
    path        : AppR.register.from.config,
    loadChildren: () => import('../../auth').then( m => m.RegisterModule )
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
