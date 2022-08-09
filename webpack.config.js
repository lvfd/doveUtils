const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV

let config = {
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: '[name].dove.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
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

module.exports = config