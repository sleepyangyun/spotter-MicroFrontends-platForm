import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    /* configurations... */
    darkMode: false,
    extract: {
        include: ['./**/*.{html,jsx,tsx}'],
        exclude: ['/node_modules/**/*', '/.git/**/*'],
    },
    preflight: false,
    theme: {
        extend: {
            colors: {
                warn: '#FFA940',
                black: '#000000',
                primary: '#2F54EB',
                /** 多用于背景 */
                block: '#F7F9FB',
                /** 多用于二级文本 */
                'gray-2': 'rgba(0, 0, 0, 0.45)',
                success: '#52C41A',
                danger: '#FF4D4F',
                'menu-bg-color': '#F6F8FC',
            },
            backgroundColor: {
                hover: 'rgba(245, 245, 245, 1)',
            },
        },
        fontFamily: {
            sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
            serif: ['Montserrat', 'ui-serif', 'Georgia'],
            mono: ['Fira Sans', 'upi-monospace', 'SFMono-Regular'],
        },
    },
});
