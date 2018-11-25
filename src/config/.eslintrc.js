const { ifAnyDep } = require('../utils')
module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier', 'jest'],
  extends: [
    'standard',
    'standard-react',
    'prettier',
    'plugin:jest/recommended',
  ],
  rules: {
    'prettier/prettier': 2,
    'react/prop-types': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
  },
}
