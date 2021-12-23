import { PublicContext } from '~utils/context/public-context';
import { IException } from '~utils/exceptions/exception.interface';
import { IDomainEvent, IDomainEventJsonData } from '~utils/generics/interfaces/domain-event.interface';
import { mapContextToJson, mapErrorsToJson } from '~utils/mappers/domain-event.mappers';

type EventData = { context: PublicContext; errors: IException[] };

export class FailedToRegisterUserEvent implements IDomainEvent<void> {

    readonly data: EventData;
    readonly name: string;

    constructor(data: EventData) {
        this.data = data;
        this.name = FailedToRegisterUserEvent.name;
    }

    toJson(): IDomainEventJsonData {

        const { context, errors } = this.data;

        return {
            name   : this.name,
            context: mapContextToJson( context ),
            payload: null,
            errors : mapErrorsToJson( errors ),
        };
    }

}
