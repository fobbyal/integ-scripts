const path = require('path')
const spawn = require('cross-spawn')
const here = p => path.join(__dirname, p)
const rimraf = require('rimraf')
const { fromRoot, resolveBin, hasFile } = require('../../utils')

const crossEnv = resolveBin('cross-env')
const webpack = resolveBin('webpack', { executable: 'webpack' })
// third arg is --webpack
const args = process.argv.slice(3)

const useBuiltinConfig = !hasFile('webpack.config.js')
const config = useBuiltinConfig
  ? ['--config', here('../../config/webpack.config.js')]
  : []

const useSpecifiedOutDir = args.includes('--out-dir')
// const outDir = useSpecifiedOutDir ? [] : ['--out-dir', 'dist']

if (!useSpecifiedOutDir && !args.includes('--no-clean')) {
  rimraf.sync(fromRoot('dist'))
}
console.log('webpack args are', args)

const defaultEnv = [`BUILD_WEBPACK=true`].join(' ')

const result = spawn.sync(
  crossEnv,
  [defaultEnv, webpack, ...config].concat(args),
  {
    stdio: 'inherit',
  }
)
process.exit(result.status)
