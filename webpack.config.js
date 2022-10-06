const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV
const platform = process.platform

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
  name: 'dovepay',
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

/* 配置货运系统 */
function getOutputByPlatform(platform) {
  if (/(win32)|(darwin)/.test(platform)) {
    return path.resolve(__dirname, '../', 'dovepay-freight', 'dist')
  }
  if (/linux/.test(platform)) {
    return path.resolve(__dirname, '../', '../', 'n-app-ft', 'dist')
  }
}
let config_dovepayFreight = Object.assign({}, config)
config_dovepayFreight.name = 'dovepay-freight'
config_dovepayFreight.entry = {
  dovepayFreight: './src/dovepay-freight/Entry',
}
config_dovepayFreight.output = {
  filename: config.output.filename,
  path: getOutputByPlatform(platform),
}
config_dovepayFreight.optimization = {}

/* 配置doveMgr */
let config_dovemgr = Object.assign({}, config)
config_dovemgr.name = 'dovemgr'
config_dovemgr.entry = {
  dovemgr: './src/dovemgr',
}

/* 加入生产或开发环境参数 */
function setByEnv(config, env) {
  if (env === 'development') {
    config.mode = 'development'
    config.devtool = 'inline-source-map'
    // config.output.clean = true
    config.plugins = [new HtmlWebpackPlugin()]
  }
  if (env === 'production') {
    config.output.filename = '[name].min.js'
    config.mode = 'production'
    config.devtool = 'source-map'
  }
  return config
}

module.exports = [
  setByEnv(config, env),
  setByEnv(config_dovepayFreight, env),
  setByEnv(config_dovemgr, env),
]