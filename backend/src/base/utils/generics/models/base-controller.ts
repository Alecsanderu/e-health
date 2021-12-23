import { isNil } from '@nestjs/common/utils/shared.utils';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IContext } from '~utils/context/context.interface';
import { PublicContext } from '~utils/context/public-context';

export abstract class BaseController {

    protected getContext<T extends IContext<any>>(headers: any, request: any): T {

        if( isNil( request?.user ) || request?.user === false ) {
            return new PublicContext() as T;
        }

        return new AuthenticatedContext( request.user ) as T;
    }
}
