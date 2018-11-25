if (process.argv.includes('--webpack')) {
  console.log('****Building via webpack****')
  require('./webpack')
} else if (process.argv.includes('--rollup')) {
  console.log('****building via rollup NOT YET IMPLEMENTED****')
  require('./rollup')
} else {
  console.log('****Building babel****')
  require('./babel')
}
