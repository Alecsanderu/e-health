import { Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '~config/config.module';
import { GLOBAL_ERROR_HANDLER } from '~config/constants/providers.constant';
import { AppConfigService } from '~config/services/app-config.service';
import { HospitalManagementModule } from '~hospital-management/hospital-management.module';
import { UserManagementModule } from '~user-management/user-management.module';
import { GlobalExceptionFilter } from '~utils/exceptions/global-exception.filter';
import { GlobalExceptionHandler } from '~utils/exceptions/global-exception.handler';
import { UtilsModule } from '~utils/utils.module';

@Module(
    {
        imports  : [
            ConfigModule.forRootAsync(
                {
                    useFactory: () => (
                        `.env_${ process.env.NODE_ENV }.env`
                    ),
                },
            ),
            TypeOrmCoreModule.forRootAsync(
                {
                    useFactory: (configService: AppConfigService) => (
                        {
                            type            : 'postgres',
                            host            : configService.dbHost,
                            port            : configService.dbPort,
                            username        : configService.dbUser,
                            password        : configService.dbPassword,
                            database        : configService.dbName,
                            schema          : configService.dbSchema,
                            entities        : [ `${ __dirname }/**/*.entity{.ts,.js}` ],
                            migrations      : [ `${ __dirname }/base/migrations/*{.ts,.js}` ],
                            autoLoadEntities: true,
                            cache           : true,
                            synchronize     : configService.dbSync,
                            extra           : {
                                max : 10,
                                host: configService.dbHost,
                            },
                        }
                    ),
                    imports   : [ ConfigModule ],
                    inject    : [ AppConfigService ],
                },
            ),
            UserManagementModule,
            HospitalManagementModule,
            UtilsModule,
        ],
        providers: [
            {
                provide : GLOBAL_ERROR_HANDLER,
                useClass: GlobalExceptionHandler,
            },
            {
                provide : APP_FILTER,
                useClass: GlobalExceptionFilter,
            },
        ],
    },
)
export class AppModule implements OnModuleInit {

    constructor(private readonly connection: Connection) {
    }

    async onModuleInit(): Promise<any> {
        await this.connection.runMigrations();
    }
}
