module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
  },
  plugins: ['lodash-fp'],
};
