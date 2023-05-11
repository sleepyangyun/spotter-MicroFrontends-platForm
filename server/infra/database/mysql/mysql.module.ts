import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SettingModule} from "@server/infra/setting/setting.module";
import {SettingService} from "@server/infra/setting/setting.service";
import {SettingSection} from "@server/infra/setting/setting.constants";
import {LoggerService} from "@server/infra/logger/logger.service";
import {LoggerModule} from "@server/infra/logger/logger.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SettingModule, LoggerModule],
            useFactory: (settingService: SettingService) => {
                const { mysql, enable } = settingService.get(SettingSection.DATABASE)
                return enable ? {
                    ...mysql,
                    type: 'mysql',
                    autoLoadEntities: true,
                } : {}
            },
            inject:[SettingService, LoggerService]
        })],
    exports: [TypeOrmModule]
})
export class MySQLModule {

}