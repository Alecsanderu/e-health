import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import { CONFIG_FILE } from '~config/constants/providers.constant';
import { valueIsNotEmpty } from '~utils/validation/is-not-empty.function';

type EnvConfig = Record<string, string>;

@Injectable()
export class AppConfigService {

    private readonly configuration: EnvConfig;

    constructor(@Inject( CONFIG_FILE ) private readonly configFile: string) {
        const config = dotenv.parse( fs.readFileSync( configFile ) );
        this.configuration = this.validateEnvFileConfiguration( config );
    }

    get appName(): string {
        return this.getFromEnvFile( 'APP_NAME' );
    }

    get environment(): string {
        return this.getFromEnvFile( 'NODE_ENV' );
    }

    get logLevel(): string {
        return this.getFromEnvFile( 'LOG_LEVEL' );
    }

    get dbLogLevel(): string {
        return this.getFromEnvFile( 'DB_LOG_LEVEL' );
    }

    get port(): string {
        return this.getFromEnvFile( 'PORT' );
    }

    get dbHost(): string {
        return this.getFromEnvFile( 'DB_HOST' );
    }

    get dbPort(): number {
        return parseInt( this.getFromEnvFile( 'DB_PORT' ), 10 );
    }

    get dbUser(): string {
        return this.getFromEnvFile( 'DB_USER' );
    }

    get dbPassword(): string {
        return this.getFromEnvFile( 'DB_PASSWORD' );
    }

    get dbName(): string {
        return this.getFromEnvFile( 'DB_NAME' );
    }

    get dbSchema(): string {
        return this.getFromEnvFile( 'DB_SCHEMA' );
    }

    get dbEnableSSL(): boolean {
        return Boolean( this.getFromEnvFile( 'DB_ENABLE_SSL' ) );
    }

    get dbSync(): boolean {
        return Boolean( this.getFromEnvFile( 'DB_SYNC_SCHEMA' ) );
    }

    get jwtSecret(): string {
        return this.getFromEnvFile( 'JWT_SECRET' );
    }

    get jwtTokenExpiration(): string {
        return this.getFromEnvFile( 'JWT_TOKEN_EXPIRATION' );
    }

    get authHeaderName(): string {
        return this.getFromEnvFile( 'AUTH_HEADER_NAME' );
    }

    jwtTokenExpirationAsTimestamp(validity?: string): number {

        const expiration = validity ?? this.jwtTokenExpiration;
        const now = dayjs();

        if( expiration.indexOf( 'ms' ) >= 0 ) {
            const ms = expiration.replace( /(ms)/g, '' );
            return now.add( Number( ms ), 'ms' )
                      .valueOf();
        }

        if( expiration.indexOf( 's' ) >= 0 ) {
            const ms = expiration.replace( /(s)/g, '' );
            return now.add( Number( ms ), 's' )
                      .valueOf();
        }

        if( expiration.indexOf( 'm' ) >= 0 ) {
            const m = expiration.replace( /(m)/g, '' );
            return now.add( Number( m ), 'm' )
                      .valueOf();
        }

        if( expiration.indexOf( 'h' ) >= 0 ) {
            const ms = expiration.replace( /(h)/g, '' );
            return now.add( Number( ms ), 'h' )
                      .valueOf();
        }

        if( expiration.indexOf( 'd' ) >= 0 ) {
            const ms = expiration.replace( /(d)/g, '' );
            return now.add( Number( ms ), 'd' )
                      .valueOf();
        }

        throw new Error(
            'Invalid env configuration. Invalid unit for JWT_TOKEN_EXPIRATION_INTERVAL. Allowed values are (ms, s, m, h, d). Eg. 10d' );

    }

    private getFromEnvFile(param: string): string {
        return this.configuration[param];
    }

    private validateEnvFileConfiguration(config: EnvConfig): EnvConfig {

        const schema: Joi.ObjectSchema = Joi.object(
            {
                APP_NAME            : Joi.string()
                                         .required(),
                NODE_ENV            : Joi.string()
                                         .valid( 'dev', 'prod' ),
                LOG_LEVEL           : Joi.string()
                                         .valid( 'debug',
                                                 'verbose',
                                                 'http',
                                                 'info',
                                                 'warn',
                                                 'error' )
                                         .required(),
                DB_LOG_LEVEL        : Joi.string()
                                         .valid( 'debug',
                                                 'verbose',
                                                 'http',
                                                 'info',
                                                 'warn',
                                                 'error' ),
                PORT                : Joi.number()
                                         .required(),
                DB_HOST             : Joi.string()
                                         .required(),
                DB_PORT             : Joi.number()
                                         .required(),
                DB_USER             : Joi.optional(),
                DB_PASSWORD         : Joi.optional(),
                DB_NAME             : Joi.string()
                                         .required(),
                DB_SCHEMA           : Joi.string()
                                         .default( 'public' ),
                DB_ENABLE_SSL       : Joi.boolean()
                                         .default( false ),
                DB_SYNC_SCHEMA      : Joi.boolean()
                                         .default( false ),
                JWT_SECRET          : Joi.string()
                                         .required(),
                JWT_TOKEN_EXPIRATION: Joi.string()
                                         .required(),
                AUTH_HEADER_NAME    : Joi.string()
                                         .required(),
            },
        );

        const { error, value: validatedConfiguration } = schema.validate( config, { allowUnknown: false, abortEarly: true } );

        if( valueIsNotEmpty( error ) ) {
            throw new Error( `Invalid configuration ${ error?.message }` );
        }

        return validatedConfiguration;
    }
}
