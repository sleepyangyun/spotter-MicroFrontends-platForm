import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import {LoggerService} from "@server/infra/logger/logger.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private logger: LoggerService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        try {
            this.logger.log(request.session)
            if (!request.session.user){
                throw new UnauthorizedException('Unauthorized');
            }
            return true
        } catch {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
