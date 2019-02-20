import path from "path"
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin"
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {env} from "process"
// @ts-ignore
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
// @ts-ignore
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
// @ts-ignore
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
// @ts-ignore
import merge from "webpack-merge"
import commonConfig from "./webpack.common"

const config = merge(commonConfig, {
    output: {
        path: path.resolve(__dirname, "../prod"),
        filename: "[name].[chunkhash].js",
        publicPath: env.GITLAB ? "/dsportfolio/" : "/",
    },
    mode: "production",
    devtool: "",
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: env.GITLAB ? "/dsportfolio/" : "/",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[hash:base64:8]",
                        },
                    },
                    {
                        loader: "sass-loader",
                        options:
                            {
                                sourceMap: true,
                                modules: true,
                            },
                    },
                ],
            },
        ],
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true,
            hash: true,
            compile: true,
            favicon: false,
            minify: true,
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [],
            title: "Webpack App",
            xhtml: false,
            baseUrl: env.GITLAB ? "/dsportfolio/" : "/",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
    ],
    optimization: {
        namedModules: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
})

module.exports = config
