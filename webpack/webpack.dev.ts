import path from "path"
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin"
import { env } from "process"

// import webpack from "webpack"

// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    context: path.resolve(__dirname, "../"),
  entry: "./src/index.tsx",
  mode: "development",
  // output: {
  //   filename: "[name].bundle.js",
  //   path: "/dist",
  // },
  devtool: "inline-source-map",
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
                /* inline if smaller than 10 KB, otherwise load as a file */
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            }],
        },
        {
            test: /\.(eot|svg|ttf|woff2?|otf)$/,
            use: "file-loader",
        },
      {
        test: /\.(s*)css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
            {
                loader: "css-loader",
              options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: env.NODE_ENV === "production"
                      ? "[hash:base64:8]"
                      : "[folder]_[name]__[local]___[hash:base64:5]",
              }  ,
            },
          //   {
          //       loader: "typings-for-css-modules-loader",
          //       options:
          //           {
          //               importLoaders: 1,
          //               modules: true,
          //               namedExport: true,
          //               camelCase: true,
          //               localIdentName: "[name]_[local][hash:base64:5]",
          //               banner: "// *** Generated File - Do not Edit ***",
          //           },
          //   },
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
        test: /\.(tsx|ts)$/,
        enforce: "pre",
        use: [
            {
                loader: "tslint-loader",
                options: { /* Loader options go here */ },
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
      }),
    ],
    optimization: {
        namedModules: true,
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
        alias: {
            dvaApp: path.resolve(__dirname, "../src/dvaApp/index.ts"),
            models: path.resolve(__dirname, "../src/models/"),
            components: path.resolve(__dirname, "../src/components/"),
        },
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
    externals: {
    },
}

// export default config;
module.exports = config
