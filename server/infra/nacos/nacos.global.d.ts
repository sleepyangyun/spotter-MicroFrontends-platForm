import nacos from 'nacos'

declare module "nacos" {
    export declare class NacosNamingClient {
        constructor(options: any): void
        async registerInstance(serviceName: string, options: Record<string, any>): Promise<any>
        async ready(): Promise<any>
        async subscribe(serviceName: string, callback:(hosts: any[])=> void): Promise<any>
        async deregisterInstance(serviceName: string, options: Record<string, any>): Promise<any>
    }
}