import {Injectable} from '@nestjs/common';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {SettingService} from '../setting/setting.service';
import {ServiceRegistry, SettingSection} from '../setting/setting.constants';
import {ServiceRegistrySectionSetting} from '../setting/sections/service';
import {LoggerService} from '../logger/logger.service';
import {AsyncResponseResult} from './http-client.interface';
import {getJoinedUrl} from '../../util/common';
import {JSONBig2String} from '../../util/consts';
// import * as https from 'https';
import * as http from 'http';
import streamRequest from 'request'
import {VcSessionService} from "@server/infra/vc-session/vc-session.service";

@Injectable()
export class HttpClientService {
    private httpClient?: AxiosInstance;
    private registrySettingMap?: Map<ServiceRegistry, ServiceRegistrySectionSetting>;

    constructor(private loggerService: LoggerService, private settingService: SettingService, private vcSessionService: VcSessionService) {
        this.init();
    }

    private init() {
        const serviceSetting = this.settingService.get(SettingSection.SERVICE);
        this.registrySettingMap = new Map<ServiceRegistry, ServiceRegistrySectionSetting>();

        serviceSetting.registries.forEach((registry: string) => {
            // @ts-ignore
            serviceSetting[registry] &&
            // @ts-ignore
            this.registrySettingMap!.set(registry, serviceSetting[registry]);
        });

        this.httpClient = axios.create({
            transformResponse: [(data) => JSONBig2String.parse(data)],
            httpAgent: new http.Agent({keepAlive: true}),
        });

        // 请求拦截器
        this.httpClient.interceptors.request.use(
            (request) => {
                return request;
            },
            (error) => {
                this.loggerService.log(error);
                return Promise.reject(error);
            },
        );
        // 响应拦截器
        this.httpClient.interceptors.response.use(
            (response) => {
                const res = response.data;
                if (response.status === 200) {
                    return Promise.resolve(res);
                }
                return Promise.reject(res);
            },
            (error) => {
                this.loggerService.error(error);
                return Promise.reject(error);
            },
        );
    }

    getHttpClient(): AxiosInstance {
        return this.httpClient!;
    }

    async steamRequest(
        sessionDataId: string,
        options?: any,
        errorCallBack?: streamRequest.RequestCallback,
    ) {

        const sessionList = await this.vcSessionService.getSessionList(sessionDataId)
        return streamRequest({
            headers: {
                // ...headers,
                // ...((headers as any)['Cookie'] ? {} :
                'Cookie':(Array.isArray(sessionList) ?sessionList:[]).reduce((p, c, i, o) => {
                    return p + `${c?.name}=${c?.value}${i < o.length - 1 ? ';' : ''}`;
                },'')
            },
            ...options
        }, errorCallBack);
    }

    get<T = any>(
        registry: ServiceRegistry,
        path: string,
        config?: AxiosRequestConfig,
    ): AsyncResponseResult<T> {
        return this.httpClient!.get(
            getJoinedUrl(this.registrySettingMap!.get(registry)!.serviceUrl, path).href,
            config
        );
    }

    post<T = any, D = any>(
        registry: ServiceRegistry,
        path: string,
        data = {} as D,
        config?: AxiosRequestConfig,
    ): AsyncResponseResult<T> {
        return this.httpClient!.post(
            getJoinedUrl(this.registrySettingMap!.get(registry)!.serviceUrl, path).href,
            data,
            {
                ...config,
            },
        );
    }

    put<T = any, D = any>(
        registry: ServiceRegistry,
        path: string,
        data = {} as D,
        config?: AxiosRequestConfig,
    ): AsyncResponseResult<T> {
        return this.httpClient!.put(
            getJoinedUrl(this.registrySettingMap!.get(registry)!.serviceUrl, path).href,
            data,
            {
                ...config,
            },
        );
    }

    delete<T = any>(
        registry: ServiceRegistry,
        path: string,
        config?: AxiosRequestConfig,
    ): AsyncResponseResult<T> {
        return this.httpClient!.delete(
            getJoinedUrl(this.registrySettingMap!.get(registry)!.serviceUrl, path).href,
            {
                ...config
            },
        );
    }
}
