module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'node': true,
    'jest': true,
  },
  'extends': ['eslint:recommended', 'google'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'ignorePatterns': [
    '**/node_modules/**',
    '**/build/**',
    '**/coverage/**',
  ],
  'rules': {
  },
};
