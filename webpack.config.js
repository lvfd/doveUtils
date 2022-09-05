const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV

let babelLoaderConfig = {
  test: /\.m?js$/,
  include: path.resolve(__dirname, 'src'),
  exclude: /\.bower\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ['@babel/preset-env']
    },
  },
}

let config = {
  entry: {
    dovepay_recharge: './src/dovepay',
  },
  output: {
    // filename: '[name].[contenthash].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [babelLoaderConfig],
  },
}

if (env === 'development') {
  config.mode = 'development'
  config.devtool = 'inline-source-map'
  config.output.clean = true
  config.plugins = [new HtmlWebpackPlugin()]
}

if (env === 'production') {
  config.mode = 'production'
  config.devtool = 'source-map'
}

module.exports = config