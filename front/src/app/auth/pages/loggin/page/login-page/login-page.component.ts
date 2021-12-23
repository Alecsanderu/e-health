import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppR } from '../../../../../config/routes';

@Component( {
              selector   : 'app-login-page',
              templateUrl: './login-page.component.html',
              styleUrls  : [ './login-page.component.scss' ],
            } )
export class LoginPageComponent {

  constructor(
    private readonly router: Router,
  ) {
  }

  async navigateToRegisterPage(): Promise<void> {
    const registerRoute = AppR.register.from.root;
    await this.router.navigateByUrl( registerRoute );
  }

}
