import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ViewController } from '@server/infra/view/view.controller';

@Module({
    controllers: [ViewController],
})
export class ViewModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply().exclude('/static');
    }
}
