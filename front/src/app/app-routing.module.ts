import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppR } from './config/routes';
import { IsNotLoggedInGuard } from './config/guards/is-not-logged-in.guard';
import { PublicComponent } from './layout/public/public.component';
import { PUBLIC_ROUTES } from './layout/public/public-routes';
import { SecureComponent } from './layout/secure/secure.component';
import { IsLoggedInGuard } from './config/guards/is-logged-in.guard';
import { SECURE_ROUTES } from './layout/secure/secured-routes';


const routes: Routes = [
    {
        path      : '',
        redirectTo: '',
        pathMatch : 'full'
    },
    {
        path       : '',
        component  : PublicComponent,
        children   : PUBLIC_ROUTES,
        canActivate: [ IsNotLoggedInGuard ]
    },
    {
        path       : '',
        component  : SecureComponent,
        children   : SECURE_ROUTES,
        canActivate: [ IsLoggedInGuard ]
    },
    {
        path      : '**',
        redirectTo: AppR.login.from.root
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
