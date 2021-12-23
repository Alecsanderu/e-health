import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { IDomainQuery } from '~utils/generics/interfaces/domain-query.interface';

type Data = { context: AuthenticatedContext; params: null }

export class GetAllDepartmentsQuery implements IDomainQuery<null> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = GetAllDepartmentsQuery.name;
    }
}
