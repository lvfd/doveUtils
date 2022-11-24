const path = require('path')
const env = process.env.NODE_ENV
const platform = process.platform

let babelLoaderConfig = {
  test: /\.m?js$/,
  include: path.resolve(__dirname, 'src'),
  exclude: /\.bower\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            "targets": {"ie": "9"},
            "useBuiltIns": "entry",
            // "useBuiltIns": "usage",
            "corejs": "3"
          }
        ],
      ],
    },
  },
}


/* ban */
const ban = {
  mode: 'production',
  name: 'ban',
  entry: './src/public/entry/ban',
  output: {
    filename: 'ban-v1.0.min.js',
    path: path.resolve(__dirname, 'dist', 'utils')
  }
}

/* dovepay-freight */
let config_dovepayFreight = {
  name: 'dovepay-freight',
  entry: {
    dovepayFreight: './src/dovepay-freight/Entry',
  },
  output: {
    filename: '[name].js',
    path: getOutputByPlatform(platform),
  },
  module: {
    rules: [babelLoaderConfig],
  },
}


/* 配置test */
let config_test = {
  name: 'test',
  entry: {
    test: './test/src/test'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'test', 'dist'),
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      // arrowFunction: false,
      // // The environment supports BigInt as literal (123n).
      // bigIntLiteral: false,
      // // The environment supports const and let for variable declarations.
      // const: true,
      // // The environment supports destructuring ('{ a, b } = obj').
      // destructuring: true,
      // // The environment supports an async import() function to import EcmaScript modules.
      // dynamicImport: false,
      // // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      // forOf: true,
      // // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      // module: false,
      // // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      // optionalChaining: true,
      // // The environment supports template literals.
      // templateLiteral: true,
    },
  },
  module: {
    rules: [babelLoaderConfig],
  },
}


/* 加入生产或开发环境参数 */
function setByEnv(config, env) {
  if (env === 'development') {
    config.mode = 'development'
    config.devtool = 'inline-source-map'
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
  ban,
  setByEnv(config_dovepay, env),
  setByEnv(config_dovepayFreight, env),
  config_test,
]