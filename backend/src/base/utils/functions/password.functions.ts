import { compareSync, hashSync } from 'bcrypt';

export const hashPassword = (plainTextPassword: string) => {
    const saltRounds = 10;
    return hashSync( plainTextPassword, saltRounds );
};

export const matchHashPasswordTo = (hashedPassword: string, toPlainTextPassword: string): boolean => {
    return compareSync( toPlainTextPassword, hashedPassword );
};
