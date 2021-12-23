import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { valueIsEmpty } from '../../config/functions/is-empty.function';


@Pipe({ name: 'translateValue' })
export class TranslateValuePipe implements PipeTransform {
  constructor(private translator: TranslateService) {}

  transform(value: string | string[], rootTranslationKey?: string): Observable<string | string[]> {
    if( valueIsEmpty( rootTranslationKey ) ) {
      return of( value );
    }

    if ( Array.isArray(value) ) {
      const arrayOfObservables = value.map(item => this.translator.get( `${ rootTranslationKey }.${ item }` ));
      return  forkJoin(...arrayOfObservables);
    }

    return this.translator.get( `${ rootTranslationKey }.${ value }` );
  }
}
