export interface IValueObject<T, E> {
    equals(to: T): boolean;

    toEntity(...args: any[]): E;
}
