import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppR } from '../../../../../config/routes';

@Component( {
              selector   : 'app-register-page',
              templateUrl: './register-page.component.html',
              styleUrls  : [ './register-page.component.scss' ],
            } )
export class RegisterPageComponent {

  constructor(
    private readonly router: Router,
  ) {
  }

  async navigateToLoginPage(): Promise<void> {
    const loginRoute = AppR.login.from.root;
    await this.router.navigateByUrl( loginRoute );
  }

}
