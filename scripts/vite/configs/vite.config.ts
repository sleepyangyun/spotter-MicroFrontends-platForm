import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tsChecker from 'vite-plugin-checker';
import windiCSS from 'vite-plugin-windicss';
import { resolve } from 'node:path';
import replace from '@rollup/plugin-replace';
import { themeStyle } from '../../../client/theme/default';

// https://vitejs.dev/config/
export default defineConfig(() => {
    const projectRoot = resolve(process.cwd());
    const APP_DEV_PORT = process.env.APP_DEV_PORT ? +process.env.APP_DEV_PORT : 3010;

    return {
        root: resolve(projectRoot, './client'),
        mode: 'development',
        server: {
            host: 'locale.spotterio.com',
            port: APP_DEV_PORT,
            open: false,
            cors: true,
            proxy: {
                '/api/v1': {
                    target: 'http://0.0.0.0:4000/',
                    ws: true,
                    changeOrigin: true,
                    toProxy: false,
                },
            },
        },
        build: {
            rollupOptions: {
                // Externalize deps that shouldn't be bundled
                external: ['react', 'react-dom'],
                output: {
                    // Global vars to use in UMD build for externalized deps
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
            sourcemap: 'inline',
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: themeStyle,
                    javascriptEnabled: true,
                },
            },
        },
        define: {
            'process.env': '{}',
        },
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __DEV__: JSON.stringify(true),
                    'window.__SPOTTER_APP_BOOT_DATA__': JSON.stringify({
                        app: {
                            apiUrl: process.env.APP_API_URL ?? 'http://api.dev.spotterio.com',
                            code: 'gmesh',
                            name: 'Spotter',
                            apiTag: process.env.APP_API_TAG,
                            biUrl: '/api/v1/biurl',
                            messageBucketName: 'message-test-1303367458',
                            imageBucketName: 'ticket-test-1303367458',
                            businessImageBucketName: 'cooperation-test-1303367458',
                            performanceBucketName: 'performance-test-1303367458',
                            env: process.env.NODE_ENV,
                        },
                    }),
                },
            }),
            windiCSS(),
            tsChecker({
                typescript: {
                    tsconfigPath: resolve(projectRoot, './client/tsconfig.json'),
                },
            }),
            viteReact(),
        ],
        optimizeDeps: {
            force: true,
        },
        resolve: {
            alias: [
                { find: '@client', replacement: resolve(projectRoot, './client/') },
                { find: '@server', replacement: resolve(projectRoot, './server/') },
                { find: '@app', replacement: resolve(projectRoot, './client/app/') },
                { find: '@img', replacement: resolve(projectRoot, './client/img/') },
                // { find: 'react/jsx-runtime' ,replacement: 'react/jsx-runtime.js'},
            ],
        },
    };
});
