export interface IDomainModel<E> {

    readonly id: string;
    readonly isDirty: boolean;

    toEntity(...args: any[]): E;
}
