import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '@server/infra/logger/logger.service';

@Injectable()
export class ApiMiddleware implements NestMiddleware {
    constructor(private loggerService: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const code = res.statusCode;
        next();
        // log http record
        const logFormat = ` \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Request original url: ${req.originalUrl}
Method: ${req.method}
IP: ${req.ip}
Status code: ${res.statusCode}
Parmas: ${JSON.stringify(req.params)}
Query: ${JSON.stringify(req.query)}
Body: ${JSON.stringify(
            req.body,
        )} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        `;
        // 根据状态码，进行日志类型区分
        if (code >= 500) {
            this.loggerService.error(logFormat);
        } else if (code >= 400) {
            this.loggerService.warn(logFormat);
        } else {
            this.loggerService.log(logFormat);
        }
    }
}
