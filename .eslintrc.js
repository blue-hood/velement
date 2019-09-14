module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['jest'],
  rules: {
    '@typescript-eslint/indent': false
  }
};
