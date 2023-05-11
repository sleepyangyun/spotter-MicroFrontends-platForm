import { ThemeConfig } from 'antd';
import { PRIMARY_COLOR } from './const';

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#2f54eb',
        borderRadius: 2,
        borderRadiusSM: 2,
        paddingXXS: 4,
        sizeUnit: 4,
        colorLink: PRIMARY_COLOR,
        colorLinkHover: '#597ef7',
        colorLinkActive: '#1d39c4',
        colorInfoBg: '#f0f5ff',
        colorInfoBorder: '#adc6ff',
        fontFamily:
            'PingFangSC-Regular,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    },
    components: {
        Input: {
            colorBgContainer: '#f2f3f5',
            colorBorder: 'transparent',
        },
        Select: {
            colorBgContainer: '#f2f3f5',
            colorBorder: 'transparent',
        },
        DatePicker: {
            colorBgContainer: '#f2f3f5',
            colorBorder: 'transparent',
        },
        InputNumber: {
            colorBgContainer: '#f2f3f5',
            colorBorder: 'transparent',
        },
        Message: {
            // 未生效
            borderRadiusLG: 2,
        },
    },
};
export default theme;
