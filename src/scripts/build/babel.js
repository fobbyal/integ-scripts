const path = require('path')
const spawn = require('cross-spawn')
const rimraf = require('rimraf')
const {
  hasPkgProp,
  fromRoot,
  resolveBin,
  hasFile,
} = require('../../utils')

const args = process.argv.slice(2)
const here = p => path.join(__dirname, p)

const useBuiltinConfig =
  !args.includes('--presets') &&
  !hasFile('.babelrc') &&
  !hasFile('.babelrc.js') &&
  !hasFile('babel.config.js') &&
  !hasPkgProp('babel')
const config = useBuiltinConfig
  ? ['--presets', here('../../config/babel.config.js')]
  : []

const ignore = args.includes('--ignore')
  ? []
  : ['--ignore', '__tests__,__mocks__']

const copyFiles = args.includes('--no-copy-files')
  ? []
  : ['--copy-files']

const sourceMaps =
  args.includes('--no-source-maps') || args.includes('source-maps')
    ? []
    : ['--source-maps']

const useSpecifiedOutDir = args.includes('--out-dir')
const outDir = useSpecifiedOutDir ? [] : ['--out-dir', 'dist']

if (!useSpecifiedOutDir && !args.includes('--no-clean')) {
  rimraf.sync(fromRoot('dist'))
}

const result = spawn.sync(
  resolveBin('@babel/cli', { executable: 'babel' }),
  [
    ...outDir,
    ...copyFiles,
    ...ignore,
    ...sourceMaps,
    ...config,
    'src',
  ]
    .filter(f => f != null)
    .filter(f => f.trim() !== '--no-source-maps')
    .concat(args),
  { stdio: 'inherit' }
)

process.exit(result.status)
