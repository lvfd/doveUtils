const version = 'v2.0'

const path = require('path')
const webpack = require('webpack')

const config = {
  mode: 'production',
  devtool: 'source-map',
  // mode: 'development',
  // devtool: 'inline-source-map',
  name: 'dovemgr',
  entry: {
    main: './src/dovemgr/main'
  },
  output: {
    clean: true,
    filename: `[name]-${version}.min.js`,
    path: path.resolve(__dirname, 'dist', 'dovemgr')
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/static'),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "targets": {"ie": "9"},
                  "useBuiltIns": "usage",
                  "corejs": "3"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          { 
            loader: "style-loader",
            options: { injectType: "linkTag" }
          }, {
            loader: 'file-loader',
            options: {
              name: 'custom.[contenthash].[ext]',
              outputPath: 'custom/style'
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'node_modules/uikit-v2/dist'),
          path.resolve(__dirname, 'node_modules/uikit-lts/dist')
        ],
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'linkTag'}
          }, 
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath) => {
                if (/v2/.test(resourcePath)) {
                  return `uikit/v2/css/${url}`
                } else {
                  return `uikit/lts/css/${url}`
                }
              }
            }
          }
        ] 
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'libs',
          filename: `libs/[name]-${version}.min.js`,
          test: /[\\/]node_modules[\\/]/,
          // chunks: 'initial'
        },
        jquery: {
          test:/[\\/]node_modules[\\/]jquery-(v2|lts)/,
          name: (module) => {
            const path = module.identifier()
            return /jquery-v2/.test(path)? 'jquery-v2': 'jquery-lts'
          },
          filename: 'jquery/[name].min.js',
          priority: 10
        },
        uikit: {
          test: /[\\/]node_modules[\\/]uikit-(v2|lts)/,
          name: (module) => {
            const path = module.identifier()
            return /uikit-v2/.test(path)? 'uikit-v2': 'uikit-lts'
          },
          filename: (pathData) => {
            const name = pathData.chunk.name
            return /v2/.test(name)? 'uikit/v2/js/uikit.min.js': 'uikit/lts/js/uikit.min.js'
          },
          priority: 10
        },
        polyfill: {
          test: /[\\/]node_modules[\\/](dom4|showmodaldialog)/,
          name: 'polyfill',
          filename: 'libs/polyfill.min.js'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@dove': path.resolve(__dirname, 'src', 'public'),
      '@dove-img': path.resolve(__dirname, 'src', 'static/image'),
      '@dove-css': path.resolve(__dirname, 'src', 'static/style'),
      '@dove-mgr': path.resolve(__dirname, 'src', 'dovemgr')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery-lts',
      jQuery: 'jquery-lts',
    })
  ]
}

module.exports = config