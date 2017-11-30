const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const CssoWebpackPlugin = require('csso-webpack-plugin').default;
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    app:'./client/assets/js/index.js',
  },
  devtool: 'inline-source-map',
  // devServer: {
  //    contentBase: './dist'
  // },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.scss$/,
        use: [
          "style-loader?minimize",
          "css-loader?minimize",
          "sass-loader?minimize"],
        // options: {
        //   autoprefixer: autoprefixer
        // }
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
      //  {
      //    test: /\.html$/,
      //    use: ['htmlhint-loader','html-minify-loader']
      //  }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({  title: 'Webpack', template: 'client/index.html' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    }),
    new CopyWebpackPlugin([{
      from: 'client/assets/img/',
      to:'assets/img/'
    }]),
    new ImageminPlugin({ test: /\.(png|svg|jpe?g|gif)$/ })
    // new CssoWebpackPlugin({ pluginOutputPostfix: 'min' }),
    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 7000,
    //   server: { baseDir: ['./'] }
    // })
  ]
};

module.exports = config;
