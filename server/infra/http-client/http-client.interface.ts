export type AsyncResponseResult<T = any> = Promise<T>;
import { HttpResponseStatus } from '@server/infra/http-client/http-client.constant';

export interface ResponseResult<T = any> {
    code: HttpResponseStatus;
    data: T;
    message: string;
}