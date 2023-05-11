import { Global, Module } from '@nestjs/common';
import { registryServiceList } from '@server/infra/service-registry/registry';
import { HttpClientModule } from '@server/infra/http-client/http-client.module';

@Global()
@Module({
    imports: [HttpClientModule],
    providers: registryServiceList,
    exports: registryServiceList,
})
export class ServiceRegistryModule {}
