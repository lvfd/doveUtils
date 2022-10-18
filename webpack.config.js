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


/* 配置dovepay */
let config_dovepay = Object.assign({}, config)
config_dovepay.name = 'dovepay'
config_dovepay.entry = {
  dovepay: './src/dovepay/entry',
  sysIndex: './src/dovepay/sys/index',
}
config_dovepay.output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist', 'dovepay'),
}
config_dovepay.optimization = {}


/* 配置货运系统 */
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
/* 货运系统linux地址不同 */
function getOutputByPlatform(platform) {
  if (/(win32)|(darwin)/.test(platform)) {
    return path.resolve(__dirname, '../', 'dovepay-freight', 'dist')
  }
  if (/linux/.test(platform)) {
    return path.resolve(__dirname, '../', '../', 'n-app-ft', 'dist')
  }
}

module.exports = [
  setByEnv(config_dovepay, env),
  setByEnv(config_dovepayFreight, env),
  setByEnv(config_dovemgr, env),
]