const version = 'v2.0'
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const config = {
  // mode: 'production',
  // devtool: 'source-map',
  mode: 'development',
  // devtool: 'inline-source-map',
  name: 'dovepay',
  entry: {
    main: './src/dovepay/main',
    sysIndex: './src/dovepay/sys'
  },
  output: {
    clean: true,
    filename: `[name]-${version}.min.js`,
    path: path.resolve(__dirname, 'dist', 'dovepay')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        libs: {
          name: 'libs',
          filename: `libs/[name]-${version}.min.js`,
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  }
}

module.exports = merge(common, config)