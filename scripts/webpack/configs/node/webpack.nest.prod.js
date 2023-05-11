const { resolve } = require('path');

const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const appRootUrl = resolve(__dirname, '../../../../');

console.log(appRootUrl)
module.exports = function (options, webpack) {
    return {
        ...options,
        devtool: 'cheap-module-source-map',
        plugins: [
            ...options.plugins,
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new CopyPlugin({
                patterns: [
                    {
                        context: resolve(appRootUrl, './server'),
                        from: 'package.json',
                        to: resolve(appRootUrl, './dist'),
                        toType: 'dir',
                    },
                    {
                        context: resolve(appRootUrl),
                        from: '.npmrc',
                        to: resolve(appRootUrl, './dist'),
                        toType: 'dir',
                    },
                ]
            }),
        ],
        externals: [nodeExternals(), 'fastify-swagger'],
        output: {
            filename: 'server.js',
        },
    };
};
