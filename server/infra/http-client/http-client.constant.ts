export enum HttpResponseStatus {
    Ok = '200',
    InvalidRequest = '400',
    Unauthorized = '401',
    Forbidden = '403',
    UnknownError = '500',
    CaptchaLimit = '40004',
}

export const HttpResponseStatusMessage = {
    [HttpResponseStatus.Ok]: '成功',
    [HttpResponseStatus.InvalidRequest]: '请求参数错误',
    [HttpResponseStatus.Unauthorized]: '认证错误',
    [HttpResponseStatus.Forbidden]: '权限不足',
    [HttpResponseStatus.UnknownError]: '未知错误',
    [HttpResponseStatus.CaptchaLimit]: '验证码发送达到上限',
};
