const path = require('path')
const config = {
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
          filename: 'asset/images/[hash][ext]'
        }
      },
      {
        test: /\.css$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/css/[hash][ext]'
        }
      },
      {
        test: /\.(css|js)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/lib/[hash][ext]'
        },
        include: [
          path.resolve(__dirname, 'node_modules/uikit-v2/dist'),
          path.resolve(__dirname, 'node_modules/uikit-lts/dist'),
          path.resolve(__dirname, 'node_modules/jquery-v2/dist'),
          path.resolve(__dirname, 'node_modules/jquery-lts/dist'),
          path.resolve(__dirname, 'node_modules/dom4'),
          path.resolve(__dirname, 'node_modules/showmodaldialog'),
          path.resolve(__dirname, 'node_modules/chart.js/dist')
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/fonts/[name][ext]'
        },
        include: path.resolve(__dirname, 'node_modules/uikit-v2/dist')
      }
    ]
  },
  resolve: {
    alias: {
      '@dove': path.resolve(__dirname, 'src', 'public'),
      '@dove-img': path.resolve(__dirname, 'src', 'static/image'),
      '@dove-css': path.resolve(__dirname, 'src', 'static/style'),
      '@dove-mgr': path.resolve(__dirname, 'src', 'dovemgr'),
      '@dove-pay': path.resolve(__dirname, 'src', 'dovepay')
    }
  }
}

module.exports = config