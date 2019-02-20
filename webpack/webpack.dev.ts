import path from "path"
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin"
// @ts-ignore
import merge from "webpack-merge"
import commonConfig from "./webpack.common"

const config = merge(commonConfig, {
    context: path.resolve(__dirname, "../"),
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[folder]_[name]__[local]___[hash:base64:5]",
                        },
                    },
                    // {
                    //     loader: "resolve-url-loader",
                    // },
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
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true,
            hash: true,
            compile: true,
            favicon: false,
            minify: false,
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [],
            title: "Webpack App",
            xhtml: false,
            baseUrl: "/",
        }),
    ],
    optimization: {
        namedModules: true,
    },
    devServer: {
        contentBase: "./dist",
        compress: true,
        open: true,
        historyApiFallback: true,
        port: 8000,
        watchContentBase: true,
        inline: true,
        // hot: true,
    },
})

module.exports = config
