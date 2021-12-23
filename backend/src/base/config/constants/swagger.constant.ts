import { DocumentBuilder } from '@nestjs/swagger';
import { apiVersion } from '~config/constants/api-version.constant';

export enum SwaggerTags {
    Users       = 'Users',
    Auth        = 'Auth',
    Departments = 'Departments',
    Doctors     = 'Doctors',
    Patients    = 'Patients'
}

export const swaggerOptions = new DocumentBuilder()
    .setTitle( 'E-Health App API' )
    .setDescription( 'E-Health App API documentation' )
    .setVersion( apiVersion )
    .addTag( SwaggerTags.Users )
    .addTag( SwaggerTags.Auth )
    .addTag( SwaggerTags.Departments )
    .addTag( SwaggerTags.Doctors )
    .addTag( SwaggerTags.Patients )
    .addBearerAuth( { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } )
    .setExternalDoc( 'Download json spec http://host:port/api-json', 'http://localhost:3008/api-json' )
    .build();
