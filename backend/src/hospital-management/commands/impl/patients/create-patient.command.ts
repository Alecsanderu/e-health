import { CreatePatientDto } from '~hospital-management/public-contracts/dtos/create-patient.dto';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type Data = { context: AuthenticatedContext; payload: CreatePatientDto };

export class CreatePatientCommand implements IDomainCommand<CreatePatientDto> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = CreatePatientCommand.name;
    }
}
