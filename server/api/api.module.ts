import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiMiddleware } from '@server/infra/middlewares/apiMiddleware';
import { ShipmentsController } from '@server/api/shipments/shipments.controller';
import { ShipmentsModule } from '@server/api/shipments/shipments.module';
import { BiController } from './bi/bi.controller';
import { BiurlModule } from './bi/bi.module';

@Module({
    imports: [ShipmentsModule, BiurlModule],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(ApiMiddleware).forRoutes(ShipmentsController, BiController);
    }
}
