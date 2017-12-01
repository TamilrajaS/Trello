const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sassLintPlugin = require('sasslint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');

const config = {
  entry: {
    app:'./client/assets/js/index.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
        {
          enforce:'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'eslint-loader?fix'
          ]
        },
        {
          test: /\.scss$/,
          use: [
          "style-loader?minimize",
          "css-loader?minimize",
          "sass-loader?minimize"],
        },
       {
         test: /\.(png|svg|jpe?g|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new sassLintPlugin({
      glob: 'client/assets/scss/*.s?(a|c)ss'
    }),
    new HtmlWebpackPlugin({  title: 'Webpack', template: 'client/index.html' }),
    new CopyWebpackPlugin([{
      from: 'client/assets/img/',
      to:'assets/img/'
    }]),
    new ImageminPlugin({ test: /\.(png|svg|jpe?g|gif)$/ })
  ]
};
module.exports = config;
