import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json(exception.getResponse());
        } else if ((exception as AxiosError).isAxiosError) {
            const { response: _r, code } = exception as AxiosError;
            response.status(_r?.status ?? '500').json(_r?.data ?? code);
        } else {
            console.error(exception);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
}
