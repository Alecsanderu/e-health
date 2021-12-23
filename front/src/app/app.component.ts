import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { Subscription } from 'rxjs';
import * as GuiSelectors from './store/selectors/gui.selectors';
import { filter } from 'rxjs/operators';
import { isNil } from 'lodash-es';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    
    private readonly subscriptions: Subscription = new Subscription();
    
    constructor(
        private readonly store: Store<AppState>,
        private readonly messageService: MessageService,
    ) {
    }
    
    
    ngOnInit(): void {
        this.subscriptions.add( this.subscribeForToastErrors() );
        this.subscriptions.add( this.subscribeForToastSuccess() );
    }
    
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
    
    
    private subscribeForToastErrors(): Subscription {
        return this.store.select( GuiSelectors.toastErrors )
                   .pipe(
                       filter( toastError => !isNil( toastError ) )
                   )
                   .subscribe( toastError => {
                       if( isNil( toastError ) ){
                           return;
                       }
                       this.messageService.add( toastError );
                   } );
    }
    
    private subscribeForToastSuccess(): Subscription {
        return this.store.select( GuiSelectors.toastSuccess )
                   .pipe(
                       filter( toastSuccess => !isNil( toastSuccess ) )
                   )
                   .subscribe( toastSuccess => {
                       if( isNil( toastSuccess ) ){
                           return;
                       }
                       this.messageService.add( toastSuccess );
                   } );
    }
    
}
