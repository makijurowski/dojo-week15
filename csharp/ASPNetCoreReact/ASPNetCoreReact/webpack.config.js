const path = require('path');
const webpack = require('webpack');
const materialize = require("materialize-loader");

module.exports = {
  module: {
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  entry: './wwwroot/source/app.js',
  output: {
            path: path.resolve(__dirname, 'wwwroot/dist'),
            filename: 'bundle.js'
          },

plugins: [
   new webpack.ProvidePlugin({
              $: 'jquery',
         jQuery: 'jquery',
'window.jQuery': 'jquery'
                 })
],

module: {
  rules: [ { test: /\.js?$/, 
          use: { loader: 'babel-loader', options: { presets: 
                       ['babel-preset-env'] } } },
           ]
       }
};