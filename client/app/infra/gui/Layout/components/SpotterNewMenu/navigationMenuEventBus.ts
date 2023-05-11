import { eventBus } from '@spotter/utils';
import type { SpotterMenuNavigationItem } from '@app/infra/gui/Layout/components/SpotterNewMenu';

enum NAV_MENU_EVENT {
    CREATE_SUB_MENU = 'CREATE_SUB_MENU',
    DESTROY_SUB_MENU = 'DESTROY_SUB_MENU',
    SUB_MENU_HOVER_STATUS = 'SUB_MENU_HOVER_STATUS',
}

export interface CreateSubMenuPayload {
    key: string;
    data: SpotterMenuNavigationItem[];
    title: string;
}

export interface subMenuHoverStatus {
    status: boolean;
    key: string;
}

export const navigationMenuEventBus = {
    createSubMenu: (payload: CreateSubMenuPayload) => {
        eventBus.emit(NAV_MENU_EVENT.CREATE_SUB_MENU, payload);
    },
    onCreateSubMenu: (handler: (payload: CreateSubMenuPayload) => void) => {
        eventBus.on(NAV_MENU_EVENT.CREATE_SUB_MENU, handler as any);
    },
    offCreateSubMenu: (handler: (payload: CreateSubMenuPayload) => void) => {
        eventBus.off(NAV_MENU_EVENT.CREATE_SUB_MENU, handler as any);
    },

    destroySubMenu: () => {
        eventBus.emit(NAV_MENU_EVENT.DESTROY_SUB_MENU);
    },
    onDestroySubMenu: (handler: (...args: any[]) => void) => {
        eventBus.on(NAV_MENU_EVENT.DESTROY_SUB_MENU, handler);
    },
    offDestroySubMenu: (handler: (...args: any[]) => void) => {
        eventBus.off(NAV_MENU_EVENT.DESTROY_SUB_MENU, handler);
    },

    changeSubMenuHoverStatus: (data: subMenuHoverStatus) => {
        eventBus.emit(NAV_MENU_EVENT.SUB_MENU_HOVER_STATUS, data);
    },
    onChangeSubMenuHoverStatus: (handler: (...args: any[]) => void) => {
        eventBus.on(NAV_MENU_EVENT.SUB_MENU_HOVER_STATUS, handler);
    },
    offChangeSubMenuHoverStatus: (handler: (...args: any[]) => void) => {
        eventBus.off(NAV_MENU_EVENT.SUB_MENU_HOVER_STATUS, handler);
    },
};
