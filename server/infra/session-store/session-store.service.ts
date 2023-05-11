import {Injectable} from "@nestjs/common";
import {SettingService} from "@server/infra/setting/setting.service";
import MySQLStore from 'express-mysql-session'
import * as session from "express-session";
import {SettingSection} from "@server/infra/setting/setting.constants";
import mysql2 from 'mysql2/promise'

@Injectable()
export class SessionStoreService {
    private readonly mysqlSessionStore: any

    constructor(private settingService: SettingService) {
        const databaseSectionSetting = this.settingService.get(SettingSection.DATABASE)
        const authSectionSetting = this.settingService.get(SettingSection.AUTH)


        const connection = mysql2.createPool({
            user: databaseSectionSetting.mysql.username,
            password: databaseSectionSetting.mysql.password,
            port: databaseSectionSetting.mysql.port,
            database: databaseSectionSetting.mysql.database,
            connectionLimit: authSectionSetting.mysql?.connectionLimit
        });
        this.mysqlSessionStore = new (MySQLStore(session))({
            user: databaseSectionSetting.mysql.username,
            password: databaseSectionSetting.mysql.password,
            port: databaseSectionSetting.mysql.port,
            database: databaseSectionSetting.mysql.database,
            checkExpirationInterval: authSectionSetting.sessionCheckExpirationInterval,
            expiration: authSectionSetting.sessionMaxAge,
            createDatabaseTable: true,
            schema: {
                tableName: authSectionSetting.mysql?.sessionTable,
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data',
                },
            },
        }, connection)
    }

    get store() {
        return this.mysqlSessionStore
    }
}