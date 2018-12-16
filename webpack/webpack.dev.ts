import path from "path";
// import webpack from 'webpack';

// const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: path.resolve(__dirname, "../"),
  entry: './src/index.tsx',
  mode: 'development',
  // output: {
  //   filename: '[name].bundle.js',
  //   path: '/dist',
  // },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  },
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html',
          inject: true,
          hash: true,
          compile: true,
          favicon: false,
          minify: false,
          cache: true,
          showErrors: true,
          chunks: 'all',
          excludeChunks: [],
          title: 'Webpack App',
          xhtml: false,
      }),
    ],
    optimization: {
        namedModules: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.scss' ]
    },
    devServer: {
        contentBase: './dist',
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
};

// export default config;
module.exports = config;