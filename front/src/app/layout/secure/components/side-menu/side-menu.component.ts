import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppR } from '../../../../config/routes';

@Component( {
              selector   : 'app-side-menu',
              templateUrl: './side-menu.component.html',
              styleUrls  : [ './side-menu.component.scss' ]
            } )
export class SideMenuComponent implements OnInit, OnDestroy {

  @ViewChild( 'sidebar' ) sidebar?: Sidebar;

  @Input() visible = false;
  @Output() sideMenuClosed: EventEmitter<void> = new EventEmitter<void>();

  menuItems!: MenuItem[];

  private subscription: Subscription;

  constructor(private readonly router: Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.subscription.add( this.subscribeForRouteChange() );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSideMenuClosed(): void {
    this.sideMenuClosed.emit();
  }

  private subscribeForRouteChange(): Subscription {
    return this.router.events
               .pipe( filter( event => event instanceof NavigationEnd ) )
               .subscribe( () => this.sidebar?.hide() );
  }

  private getMenuItems(): MenuItem[] {
    return [
      {
        label : '<h4>General</h4>',
        escape: false,
        items : [
          {
            label                  : 'Dashboard',
            icon                   : 'pi pi-sitemap',
            routerLink             : [ AppR.dashboard.from.root ],
            routerLinkActiveOptions: {
              routerLinkActive: 'p-menuitem-link-active'
            }
          }
        ]
      },
      {
        label : '<h4 class="mt-3">Spital</h4>',
        escape: false,
        items : [
          {
            label                  : 'Departamente',
            icon                   : 'pi pi-database',
            routerLink             : [ AppR.departments.from.root ],
            routerLinkActiveOptions: {
              routerLinkActive: 'p-menuitem-link-active'
            }
          },
          {
            label                  : 'Doctori',
            icon                   : 'pi pi-users',
            routerLink             : [ AppR.doctors.from.root ],
            routerLinkActiveOptions: {
              routerLinkActive: 'p-menuitem-link-active'
            }
          },
          {
            label                  : 'Pacienti',
            icon                   : 'pi pi-heart-fill',
            routerLink             : [ AppR.patients.from.root ],
            routerLinkActiveOptions: {
              routerLinkActive: 'p-menuitem-link-active'
            }
          }
        ]
      }
    ];
  }
}
