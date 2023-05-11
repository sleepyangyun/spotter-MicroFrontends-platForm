import { Configuration, IgnorePlugin, ProvidePlugin } from 'webpack';
import loadConfiguration from '@server/infra/setting/load';
import { resolve } from 'node:path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
// @ts-ignore
import WebpackBarPlugin from 'webpackbar';
import { themeStyle } from '@client/theme/default';
import { getCssLoaders } from '@scripts/utils/common';
import WindiCssPlugin from 'windicss-webpack-plugin';

export async function generateTypeCheckerConfig(): Promise<Configuration> {
    const { server } = loadConfiguration();
    const {
        runtime: { appRootPath },
    } = server;
    // const staticPublicPath = process.argv.includes('--cdn')
    //     ? 'https://romerx-static.spotterio.com/'
    //     : '';

    return {
        context: appRootPath,
        entry: resolve(appRootPath, './client/app/prod.entry.tsx'),
        resolve: {
            // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
                '@client': resolve(appRootPath, './client'),
                '@img': resolve(appRootPath, './client/img'),
                '@app': resolve(appRootPath, './client/app'),
                '@server': resolve(appRootPath, './server'),
            },
            modules: ['node_modules', 'client'],
        },
        module: {
            rules: [
                {
                    test: /\.(tsx?|js)$/,
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: getCssLoaders(0, true),
                },
                {
                    test: /\.less$/,
                    use: [
                        ...getCssLoaders(2, true),
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    modifyVars: themeStyle,
                                    javascriptEnabled: true,
                                },
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            // 低于 10 k 转换成 base64
                            maxSize: 10 * 1024,
                        },
                    },
                    generator: {
                        // 在文件名中插入文件内容 hash，解决强缓存立即更新的问题
                        filename: 'img/[name].[contenthash].[ext]',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(svg|ttf|woff|woff2|eot|otf)$/,
                    type: 'asset/inline',
                },
            ],
        },

        cache: {
            type: 'filesystem',
        },
        mode: 'development',
        devtool: 'source-map',
        plugins: [
            new WebpackBarPlugin({
                color: '#23e577',
                name: `类型检查`,
                profile: true,
                fancy: true,
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    memoryLimit: 1024,
                    configFile: resolve(appRootPath, './client/tsconfig.json'),
                    diagnosticOptions: {
                        syntactic: true,
                        semantic: true,
                    },
                },
            }),
            // @ts-ignore
            new WindiCssPlugin({
                config: resolve(appRootPath, './client/windi.config.ts'),
            }),
            new FriendlyErrorsWebpackPlugin(),
            new IgnorePlugin({
                resourceRegExp: /^\.\/(locale|moment.js)$/,
                contextRegExp: /(moment$)/,
            }),
            new ProvidePlugin({
                React: 'react',
            }),
        ],

        experiments: {
            topLevelAwait: true,
        },
    };
}
