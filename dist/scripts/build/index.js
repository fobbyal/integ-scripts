"use strict";

if (process.argv.includes('--webpack')) {
  require('./webpack');
} else if (process.argv.includes('--rollup')) {
  require('./rollup');
} else {
  require('./babel');
}