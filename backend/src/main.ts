import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import * as helmet from 'helmet';
import { apiVersion } from '~config/constants/api-version.constant';
import { swaggerOptions } from '~config/constants/swagger.constant';
import { AppConfigService } from '~config/services/app-config.service';
import { HospitalManagementModule } from '~hospital-management/hospital-management.module';
import { UserManagementModule } from '~user-management/user-management.module';
import { AppModule } from './app.module';

async function bootstrap() {

    const app = await NestFactory.create( AppModule );
    const configuration = app.get( AppConfigService );

    app.use( json( { limit: '20mb' } ) );

    app.use( helmet() );
    app.enableCors( { origin: '*' } );

    app.setGlobalPrefix( `/${ apiVersion }` );

    const swaggerDocument = getSwaggerDocument( app );
    SwaggerModule.setup( 'api', app, swaggerDocument, { swaggerOptions: { displayRequestDuration: true } } );

    await app.listen( configuration.port );
}

function getSwaggerDocument(app: INestApplication): OpenAPIObject {
    return SwaggerModule.createDocument( app, swaggerOptions, {
        include: [
            UserManagementModule,
            HospitalManagementModule,
        ],
    } );
}

bootstrap();
