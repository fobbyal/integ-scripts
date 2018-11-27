const babelConfgGenerator = require('./babel.config')
const { hasPkgProp, hasFile, fromRoot } = require('../utils')
// const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const react = fromRoot('node_modules/react')
const reactDom = fromRoot('node_modules/react-dom')
const reactHotLoader = fromRoot('node_modules/react-hot-loader')
const gridTools = fromRoot('node_modules/@integec/grid-tools')
const git = require('git-rev-sync')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = function(env, argv) {
  const isProd = argv.mode === 'production' || env.production

  const gitInfo = {
    GIT_HASH:
      hasFile('.git') && isProd
        ? JSON.stringify(git.short())
        : '"local"',
  }

  const useBuiltinConfig =
    !hasFile('.babelrc') &&
    !hasFile('.babelrc.js') &&
    !hasFile('babel.config.js') &&
    !hasPkgProp('babel')

  const babelrc = useBuiltinConfig
    ? babelConfgGenerator({})
    : undefined

  const devtool = isProd ? 'source-maps' : 'eval'

  const module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        include: /integec/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelrc,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /immutable-ext/,
        options: babelrc,
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  }

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      ...gitInfo,
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

  return { module, devtool, resolve, plugins }
}
