import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JWTDecodeProviders } from './config/guards';
import { httpInterceptorProviders } from './config/http-interceptors';
import { RequestCacheService } from './config/services/request-cache.service';
import { PublicComponent } from './layout/public/public.component';
import { NavbarComponent } from './layout/secure/components/navbar/navbar.component';
import { SideMenuComponent } from './layout/secure/components/side-menu/side-menu.component';
import { SecureComponent } from './layout/secure/secure.component';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './store/effects/auth.effect';
import { DepartmentEffects } from './store/effects/department.effects';
import { DoctorsEffects } from './store/effects/doctors.effects';
import { PatientEffects } from './store/effects/patient.effects';
import { metaReducers, reducers } from './store/reducers';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader( http, './assets/i18n/', '.json' );
}

@NgModule( {
             declarations: [
               AppComponent,
               PublicComponent,
               SecureComponent,
               SideMenuComponent,
               NavbarComponent,
             ],
             imports     : [
               BrowserModule,
               BrowserAnimationsModule,
               AppRoutingModule,
               StoreModule.forRoot( reducers, { metaReducers } ),
               !environment.production
               ? StoreDevtoolsModule.instrument()
               : [],
               HttpClientModule,
               TranslateModule.forRoot( {
                                          defaultLanguage: 'ro',
                                          loader         : {
                                            provide   : TranslateLoader,
                                            useFactory: (
                                              createTranslateLoader
                                            ),
                                            deps      : [ HttpClient ],
                                          },
                                        } ),
               EffectsModule.forRoot( [
                                        AuthEffects,
                                        DepartmentEffects,
                                        DoctorsEffects,
                                        PatientEffects,
                                      ] ),
               ToastModule,
               RouterModule,
               SharedModule,
               ButtonModule,
               SidebarModule,
               MenuModule,
             ],
             providers   : [
               httpInterceptorProviders,
               JWTDecodeProviders,
               JwtHelperService,
               RequestCacheService,
               MessageService,
               ConfirmationService,
             ],
             bootstrap   : [ AppComponent ],
           } )
export class AppModule {
}
