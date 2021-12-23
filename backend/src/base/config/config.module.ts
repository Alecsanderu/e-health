import { DynamicModule, Global, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { CONFIG_FILE } from '~config/constants/providers.constant';
import { AppConfigService } from '~config/services/app-config.service';

export interface ConfigurationModuleOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: () => string;
    inject?: any;
}

@Global()
@Module( {} )
export class ConfigModule {

    static forRootAsync(options: ConfigurationModuleOptions): DynamicModule {
        return {
            module   : ConfigModule,
            providers: [ AppConfigService, ...this.createProviders( options ) ],
            exports  : [ AppConfigService ],
        };
    }

    private static createProviders(options: ConfigurationModuleOptions): Provider[] {
        return [
            {
                provide   : CONFIG_FILE,
                useFactory: options.useFactory,
                inject    : options?.inject || [],
            },
        ];
    }
}
