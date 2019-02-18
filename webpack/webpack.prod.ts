import path from "path"
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin"
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {env} from "process"
import CopyWebpackPlugin from "copy-webpack-plugin"
// @ts-ignore
import WriteFilePlugin from "write-file-webpack-plugin"

const config = {
    context: path.resolve(__dirname, "../"),
    output: {
        path: path.resolve(__dirname, "../prod"),
        filename: "[name].[chunkhash].js",
    },
    entry: "./src/index.tsx",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                    },
                }],
            },
            {
                test: /\.(eot|ttf|woff2?|otf)$/,
                use: "file-loader",
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
            {
                test: /\.svg$/,
                exclude: /(node_modules|colored)/,
                use: [
                    "svg-sprite-loader",
                    {
                        loader: "svgo-loader",
                        options: {
                            plugins: [
                                {removeTitle: true},
                                {
                                    removeAttrs: {attrs: ["fill", "fill-rule"]},
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                include: /colored/,
                use: [
                    "svg-sprite-loader",
                ],
            },
            {
                test: /\.(tsx|ts)$/,
                enforce: "pre",
                use: [
                    {
                        loader: "tslint-loader",
                        options: { /* Loader options go here */},
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
        new WriteFilePlugin(),
        new CopyWebpackPlugin([{
            from: "public",
        }]),
    ],
    optimization: {
        namedModules: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            src: path.resolve(__dirname, "../src/"),
            dvaApp: path.resolve(__dirname, "../src/dvaApp/index.ts"),
            models: path.resolve(__dirname, "../src/models/"),
            components: path.resolve(__dirname, "../src/components/"),
            styles: path.resolve(__dirname, "../src/styles/"),
            variables: path.resolve(__dirname, "../src/styles/variables.scss"),
            game: path.resolve(__dirname, "../src/game/"),
            assets: path.resolve(__dirname, "../public/assets"),
        },
    },
    externals: {},
}

// export default config;
module.exports = config
