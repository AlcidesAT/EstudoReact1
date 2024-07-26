const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const common = require('./webpack.common.js')
const { resolve } = require('path')

module.exports = merge.merge(common, {
    devtool: 'source-map',
    entry: [ path.join(__dirname, 'src/server.ts') ],
    externals: [
        nodeExternals({
            allowlist: [ 'webpack/hot/poll?1000' ]
        })
    ],
    mode: 'development',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve('./tsconfig.json'),
            },
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(), ],
    devServer: {
        compress: true,
        port: 9000,
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    }
})
