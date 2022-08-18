const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV

let config = {
  entry: {
    index: './src/index.js',
    // other: './src/other.js',
    test: './src/public/test.bower.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /\.bower\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
}

if (env === 'development') {
  config.mode = 'development'
  config.devtool = 'inline-source-map'
}

if (env === 'production') {
  config.mode = 'production'
  config.devtool = 'source-map'
}

module.exports = config