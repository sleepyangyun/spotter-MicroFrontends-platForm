import { FC, ReactNode, Suspense, useMemo } from 'react';
import { ConfigProvider, Modal } from 'antd';
import antdEn from 'antd/es/locale/en_US';
import antdZh from 'antd/es/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';
import { SuspenseLoading } from '@app/infra/gui/SuspenseLoading';
import { ErrorBoundary } from '@app/infra/gui/ErrorBoundary';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import dayjsZh from 'dayjs/locale/zh-cn';
import dayjsEn from 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import ModalContext from '@app/components/Modal/context';
import AppRoutes from '@app/routes';

import { DEFAULT_TIMEZONE } from '@spotter/utils';
import { SpotterAppDecorator } from './infra/decorator';
import Downgrade from './infra/gui/Downgrade';
import 'antd/dist/reset.css';
import '../style/index.less';

import theme from './utils/theme';
import { masterStore, MasterStoreProvider } from './store';

dayjs.extend(utc);
dayjs.extend(timezone);
// 用于计算ms转换min，hour，day
dayjs.extend(duration);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(isBetween);

dayjs.tz.setDefault(DEFAULT_TIMEZONE);

const antdI18n = {
    en: antdEn,
    zh: antdZh,
};

const dayjsI18n = {
    en: dayjsEn,
    zh: dayjsZh,
};

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();
    const [modal, contextPlaceholder] = Modal.useModal();
    dayjs.locale(dayjsI18n[i18n.language as keyof typeof dayjsI18n]);

    const modalInstance = useMemo(() => ({ modal }), [modal]);
    return (
        <MasterStoreProvider value={masterStore}>
            <ConfigProvider locale={antdI18n[i18n.language as keyof typeof antdI18n]} theme={theme}>
                {contextPlaceholder}
                <ModalContext.Provider value={modalInstance}>{children}</ModalContext.Provider>
            </ConfigProvider>
        </MasterStoreProvider>
    );
};

export default function App() {
    return (
        <Suspense fallback={<SuspenseLoading />}>
            <Provider>
                <ErrorBoundary FallbackComponent={Downgrade.ClientError}>
                    <BrowserRouter>
                        <SpotterAppDecorator>
                            <AppRoutes />
                        </SpotterAppDecorator>
                    </BrowserRouter>
                </ErrorBoundary>
            </Provider>
        </Suspense>
    );
}
