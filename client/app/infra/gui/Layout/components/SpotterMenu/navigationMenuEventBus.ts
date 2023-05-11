import { eventBus } from '@spotter/utils';
import type { SpotterMenuNavigationItem } from '@app/infra/gui/Layout/components/SpotterMenu';

enum NAV_MENU_EVENT {
    CREATE_SUB_MENU = 'CREATE_SUB_MENU',
    DESTROY_SUB_MENU = 'DESTROY_SUB_MENU',
}

export interface CreateSubMenuPayload {
    data: SpotterMenuNavigationItem[];
    title: string;
    position: {
        x: number;
        y: number;
    };
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
};
