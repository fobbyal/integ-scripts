const path = require('path')
const spawn = require('cross-spawn')
const here = p => path.join(__dirname, p)
const rimraf = require('rimraf')
const { fromRoot, resolveBin, hasFile } = require('../utils')

const crossEnv = resolveBin('cross-env')
const webpackDevServer = resolveBin('webpack-dev-server')

const args = process.argv.slice(2)

const useBuiltinConfig = !hasFile('webpack.config.js')
const config = useBuiltinConfig
  ? ['--config', here('../config/webpack.config.js')]
  : []

const useSpecifiedOutDir = args.includes('--out-dir')
// const outDir = useSpecifiedOutDir ? [] : ['--out-dir', 'dist']

if (!useSpecifiedOutDir && !args.includes('--no-clean')) {
  rimraf.sync(fromRoot('dist'))
}

const port = args.includes('--port') ? [] : ['--port', '3000']
const host = args.includes('--host') ? [] : ['--host', '0.0.0.0']

const defaultEnv = [`BUILD_WEBPACK=true`].join(' ')

const result = spawn.sync(
  crossEnv,
  [
    defaultEnv,
    webpackDevServer,
    ...config,
    '--mode',
    'development',
    ...port,
    ...host,
    '--hot',
    '--compress',
  ].concat(args),
  {
    stdio: 'inherit',
  }
)
process.exit(result.status)
