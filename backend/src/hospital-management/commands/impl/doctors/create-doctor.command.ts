import { CreateDoctorDto } from '~hospital-management/public-contracts/dtos/create-doctor.dto';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type Data = { context: AuthenticatedContext; payload: CreateDoctorDto };

export class CreateDoctorCommand implements IDomainCommand<CreateDoctorDto> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = CreateDoctorCommand.name;
    }
}
