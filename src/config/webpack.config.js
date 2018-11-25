const babelConfgGenerator = require('./babel.config')
const { hasPkgProp, hasFile } = require('../utils')
const path = require('path')
module.exports = function() {
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
    ],
  }

  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(
        path.join(__dirname, './node_modules/react')
      ),
      'babel-core': path.resolve(
        path.join(__dirname, './node_modules/@babel/core')
      ),
      'react-hot-loader': path.resolve(
        path.join(__dirname, './node_modules/react-hot-loader')
      ),
      '@integec/grid-tools': path.resolve(
        path.join(__dirname, './node_modules/@integec/grid-tools')
      ),
    },
  }

  return { module, resolve }
}
