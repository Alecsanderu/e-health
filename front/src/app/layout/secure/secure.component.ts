import { Component } from '@angular/core';

@Component( {
              selector   : 'app-secure',
              templateUrl: './secure.component.html',
              styleUrls  : [ './secure.component.scss' ],
            } )
export class SecureComponent {

  sideMenuVisible = false;

  setSideMenuVisibility(value: boolean): void {
    this.sideMenuVisible = value;
  }

}

