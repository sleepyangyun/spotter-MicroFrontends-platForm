import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// @ts-ignore
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { Configuration, ProvidePlugin, IgnorePlugin, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import loadConfiguration from '@server/infra/setting/load';
import { resolve } from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WindiCssPlugin from 'windicss-webpack-plugin';
import WebpackBarPlugin from 'webpackbar';
import { themeStyle } from '@client/theme/default';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { getCssLoaders } from '@scripts/utils/common';

export async function generateProdConfig(): Promise<Configuration> {
    const { server } = loadConfiguration();
    const {
        runtime: { appRootPath },
        appName,
        staticRootPath,
    } = server;

    let prodConfig: Configuration = {
        context: appRootPath,
        entry: [resolve(appRootPath, './client/app/prod.entry.tsx')],
        output: {
            publicPath: process.argv.includes('--release')
                ? process.env.ASSET_PUBLIC_PATH ?? ''
                : '',
            path: resolve(appRootPath, staticRootPath),
            filename: '[name]-[contenthash].bundle.js',
            // chunkFilename: 'js/[name].bundle.js',
            hashSalt: 'gmesh',
            clean: {
                keep: /.+\.js/,
            },
        },
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
        devtool: 'source-map',
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
                    use: getCssLoaders(0),
                },
                {
                    test: /\.less$/,
                    use: [
                        ...getCssLoaders(2),
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
                        filename: '[name].[contenthash][ext]',
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
        mode: 'production',
        optimization: {
            minimize: true,
            runtimeChunk: 'single',
            nodeEnv: 'production',
            minimizer: [
                /** minify js */
                // @ts-ignore
                new TerserPlugin({ extractComments: true }),
                /** optimize & minify css */
                new CssMinimizerPlugin(),
            ],
            // splitChunks: {
            //     chunks: 'all',
            //     cacheGroups: {
            //         vendor: {
            //             name: 'chunk-vendors',
            //             test: /[\\/]node_modules[\\/]/,
            //             priority: 10,
            //             chunks: 'initial'
            //         },
            //         echarts: {
            //             name: 'chunk-echarts',
            //             priority: 20,
            //             test: /[\\/]node_modules[\\/]_?echarts|zrender(.*)/
            //         },
            //         commons: {
            //             name: 'chunk-commons',
            //             minChunks: 3, // minimum common number
            //             priority: 5,
            //             reuseExistingChunk: true
            //         },
            //         lib: {
            //             test:(module: any)=> {
            //                 return (
            //                     module.size() > 160000 &&
            //                     /node_modules[/\\]/.test(module.nameForCondition() || '')
            //                 )
            //             },
            //             name: (module: any)=> {
            //                 const packageNameArr = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            //                 const packageName = packageNameArr ? packageNameArr[1] : '';
            //                 // npm package names are URL-safe, but some servers don't like @ symbols
            //                 return `chunk-lib.${packageName.replace("@", "")}`;
            //             },
            //             priority: 15,
            //             minChunks: 1,
            //             reuseExistingChunk: true,
            //         },
            //     }
            // },
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    react: {
                        test: /[/\\]node_modules[/\\]react|react-dom[/\\].*[jt]sx?$/,
                        chunks: 'initial',
                        priority: 10,
                        enforce: true,
                        name: 'react',
                    },
                    util: {
                        test: /[/\\]node_modules[/\\](lodash|moment|i18next[/\\]dist[/\\]cjs|react-i18next[/\\]dist[/\\]cjs|i18next-icu[/\\]dist[/\\]es|bignumber\.js|axios|dayjs|big\.js|json-biginit[/\\]lib)[/\\].*[jt]sx?$/,
                        chunks: 'initial',
                        priority: 10,
                        enforce: true,
                        name: 'util',
                    },
                    store: {
                        test: /[/\\]node_modules[/\\](mobx|mobx-state-tree|mobx-react-lite)[/\\]dist[/\\].*[jt]sx?$/,
                        chunks: 'initial',
                        priority: 10,
                        enforce: true,
                        name: 'store',
                    },
                    antd: {
                        test: /[/\\]node_modules[/\\](antd|@ant-design[/\\](pro-layout|pro-form|pro-table|pro-field|g-math|pro-utils))[/\\]es[/\\].*[jt]sx?$/,
                        chunks: 'initial',
                        priority: 10,
                        enforce: true,
                        name: 'ui',
                    },
                    echarts: {
                        test: /[/\\]node_modules[/\\]_?echarts|zrender(.*)/,
                        chunks: 'async',
                        priority: 20,
                        enforce: true,
                        name: 'echarts',
                    },
                    xlsx: {
                        test: /[/\\]node_modules[/\\]xlsx[/\\].*mjs?$/,
                        chunks: 'async',
                        priority: 20,
                        enforce: true,
                        name: 'xlsx',
                    },
                    'wang-editor': {
                        test: /[/\\]node_modules[/\\]@wangeditor[/\\](editor|editor-for-react)[/\\]dist[/\\].*[jt]sx?$/,
                        chunks: 'async',
                        priority: 50,
                        enforce: true,
                        name: 'editor',
                    },
                    defaultVendors: {
                        test: /[/\\]node_modules[/\\].*[jt]sx?$/,
                        chunks: 'initial',
                        priority: -10,
                        reuseExistingChunk: true,
                        name: 'commonLib',
                    },
                    default: {
                        priority: -20,
                        chunks: 'all',
                        test: /.*[jt]sx?$/,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        plugins: [
            new WebpackBarPlugin({
                color: '#006be3',
                name: `[Web] ${appName}`,
                profile: true,
                fancy: true,
            }),
            new FriendlyErrorsWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            // @ts-ignore
            new WindiCssPlugin({
                config: resolve(appRootPath, './client/windi.config.ts'),
            }),
            // new VirtualModulesPlugin({
            //     'node_modules/module-foo.js': 'module.exports = { foo: "foo" };',
            //     'node_modules/module-bar.js': 'module.exports = { bar: "bar" };'
            // }),
            new IgnorePlugin({
                resourceRegExp: /^\.\/(locale|moment.js)$/,
                contextRegExp: /(moment$)/,
            }),
            new HtmlWebpackPlugin({
                // HtmlWebpackPlugin 会调用 HtmlMinifier 对 HTMl 文件进行压缩
                // 只在生产环境压缩
                minify: false,
                template: resolve(appRootPath, './client/views/index.template.html'),
                templateParameters: (...args: any[]) => {
                    const [compilation, assets, assetTags, options] = args;
                    // const rawPublicPath = commonConfig.output!.publicPath!;
                    return {
                        compilation,
                        webpackConfig: compilation.options,
                        htmlWebpackPlugin: {
                            tags: assetTags,
                            files: assets,
                            options,
                        },
                    };
                },
            }),
            new ProvidePlugin({
                React: 'react',
            }),
            /**
             * 本来想用 favicons-webpack-plugin [https://www.npmjs.com/package/favicons-webpack-plugin]，但是他的依赖的依赖 sharp [https://sharp.pixelplumbing.com/install] 有个 binary 包挂在 github 上，而且很大，考虑到安装体验和构建环境暂时放弃这个方案。
             * 替代方案是先 copy favicon 过去，后面实现不忙的时候可以尝试改成用上面的插件自动生成各个尺寸 favicon 的模式（优先级不高）
             */
            new CopyPlugin({
                patterns: [
                    {
                        context: resolve(appRootPath, './client/img'),
                        from: 'favicon.ico',
                        to: resolve(appRootPath, staticRootPath),
                        toType: 'dir',
                    },
                ],
            }),
            new DefinePlugin({
                process: { env: { NODE_ENV: JSON.stringify('production') } },
            }),
        ],

        experiments: {
            topLevelAwait: true,
        },
    };

    const enableAnalysis = process.argv.includes('--analyze');
    if (enableAnalysis) {
        // 使用 --analyze 参数构建时，会输出各个阶段的耗时和自动打开浏览器访问 bundle 分析页面
        // @ts-ignore
        prodConfig.plugins!.push(new BundleAnalyzerPlugin());
        const smp = new SpeedMeasurePlugin();
        prodConfig = smp.wrap(prodConfig);
    }
    return prodConfig;
}
