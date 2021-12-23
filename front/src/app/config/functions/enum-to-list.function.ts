import { TranslateService } from '@ngx-translate/core';
import { defer, from, Observable } from 'rxjs';


export const enumToList = (enumType: Object, enumName: string, translateService?: TranslateService): Observable<any[]> =>
  from(
    defer( () => Promise.all(
      Object
        .values( enumType )
        .map(
          async (value: string) => (
            {
              value,
              label: translateService
                     ? await translateService.get( `ENUM_LABELS.${ enumName }.${ value }` )
                                             .toPromise()
                     : value
            }
          ) )
    ) )
  );
