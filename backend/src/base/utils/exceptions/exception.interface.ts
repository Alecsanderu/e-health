export type ErrorCode = string;

export class IException {
    name: string;
    message: string;
    field: string | null;
}
