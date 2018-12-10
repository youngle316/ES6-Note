const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 模式
    mode: 'development',
    // 入口
    entry: './src/js/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'js/index.js',
        // 路径
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // 所有的.js文件都是用babel-loader
            {
                test: /\.m?js$/,
                // 不包含这里面的.js文件
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/view/index.html",
            filename: "view/index.html",
            title: "ES6-Note",
            inject: true,
        })
    ]
};