import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type Data = { context: AuthenticatedContext; payload: { patientId: string } };

export class CheckOutPatientCommand implements IDomainCommand<{ patientId: string }> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = CheckOutPatientCommand.name;
    }
}
