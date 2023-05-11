import { Module } from '@nestjs/common';
import { LoggerModule } from '@server/infra/logger/logger.module';
import { ViewModule } from '@server/infra/view/view.module';
import { HttpClientModule } from '@server/infra/http-client/http-client.module';
import { ServiceRegistryModule } from '@server/infra/service-registry/service-registry.module';
import { ApiModule } from '@server/api/api.module';
import { SettingModule } from '@server/infra/setting/setting.module';
import {I18nModule} from "@server/infra/i18n/i18n.module";
import {NacosModule} from "@server/infra/nacos/nacos.module";
import { VcSessionModule } from "@server/infra/vc-session/vc-session.module";
// import {MySQLModule} from "@server/infra/database/mysql/mysql.module";
// import {SessionStoreModule} from "@server/infra/session-store/session-store.module";

@Module({
    imports: [
        SettingModule,
        LoggerModule,
        // MySQLModule,
        // SessionStoreModule,
        NacosModule,
        VcSessionModule,
        HttpClientModule,
        ServiceRegistryModule,
        ApiModule,
        I18nModule,
        ViewModule
    ],
})
export class AppModule {}
