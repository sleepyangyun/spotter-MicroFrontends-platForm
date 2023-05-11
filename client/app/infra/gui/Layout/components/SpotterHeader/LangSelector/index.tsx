import { Dropdown, MenuProps } from 'antd';
import i18n from '@app/infra/i18nBackend';
import { TranslationOutlined } from '@ant-design/icons';

export const LangSelector = () => {
    const items: MenuProps['items'] = [
        {
            key: 'en',
            label: (
                <>
                    <span className="mr-10px">🇺🇸</span>
                    <span>English</span>
                </>
            ),
        },
        {
            key: 'zh',
            label: (
                <>
                    <span className="mr-10px">🇨🇳</span>
                    <span>简体中文</span>
                </>
            ),
        },
    ];
    return (
        <Dropdown
            trigger={['hover']}
            placement="bottomRight"
            menu={{
                items,
                onClick: (e) => {
                    i18n.changeLanguage(e.key);
                },
            }}
        >
            <div className="h-47px px-12px flex justify-center items-center header-menus-item">
                <TranslationOutlined style={{ fontSize: '16px', color: 'rgba(0 0 0 / 65%)' }} />
            </div>
        </Dropdown>
    );
};
