export interface IJwtPayload {
    username: string;
    sub: string;
    temporary?: boolean;
}
