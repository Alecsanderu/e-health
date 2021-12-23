import { JWT_OPTIONS } from '@auth0/angular-jwt';

export const JWTDecodeProviders = [
{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS  }
];
