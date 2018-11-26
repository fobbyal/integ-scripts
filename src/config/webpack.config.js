const babelConfgGenerator = require('./babel.config')
const { hasPkgProp, hasFile, fromRoot } = require('../utils')
// const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const react = fromRoot('node_modules/react')
const reactDom = fromRoot('node_modules/react-dom')
const reactHotLoader = fromRoot('node_modules/react-hot-loader')
const gridTools = fromRoot('node_modules/@integec/grid-tools')

module.exports = function() {
  console.log('webpack arguments are', arguments)
  const useBuiltinConfig =
    !hasFile('.babelrc') &&
    !hasFile('.babelrc.js') &&
    !hasFile('babel.config.js') &&
    !hasPkgProp('babel')

  const babelrc = useBuiltinConfig
    ? babelConfgGenerator({})
    : undefined

  const module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelrc,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  }

  const plugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ]

  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react,
      'react-dom': reactDom,
      'react-hot-loader': reactHotLoader,
      '@integec/grid-tools': gridTools,
    },
  }

  return { module, resolve, plugins }
}
