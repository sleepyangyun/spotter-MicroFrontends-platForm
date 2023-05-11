import { Module } from '@nestjs/common';
import { NacosModule } from '@server/infra/nacos/nacos.module';
import { BiController } from './bi.controller';
import { BiServiceImpl } from './bi.service';

@Module({
    imports: [NacosModule],
    controllers: [BiController],
    providers: [BiServiceImpl],
})
export class BiurlModule {}
