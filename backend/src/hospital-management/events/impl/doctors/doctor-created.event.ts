import { Doctor } from '~hospital-management/models/doctor';
import { PublicContext } from '~utils/context/public-context';
import { IDomainEvent, IDomainEventJsonData } from '~utils/generics/interfaces/domain-event.interface';
import { mapContextToJson } from '~utils/mappers/domain-event.mappers';

type EventPayload = Doctor;
type EventData = { context: PublicContext; payload: EventPayload };

export class DoctorCreatedEvent implements IDomainEvent<EventPayload> {

    readonly data: EventData;
    readonly name: string;

    constructor(data: EventData) {
        this.data = data;
        this.name = DoctorCreatedEvent.name;
    }

    toJson(): IDomainEventJsonData {

        const { context, payload } = this.data;

        return {
            name   : this.name,
            context: mapContextToJson( context ),
            payload: { ...payload.toEntity() },
            errors : null,
        };
    }
}
