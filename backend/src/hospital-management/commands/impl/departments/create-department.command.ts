import { CreateDepartmentDto } from '~hospital-management/public-contracts/dtos/create-department.dto';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type Data = { context: AuthenticatedContext; payload: CreateDepartmentDto };

export class CreateDepartmentCommand implements IDomainCommand<CreateDepartmentDto> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = CreateDepartmentCommand.name;
    }
}
