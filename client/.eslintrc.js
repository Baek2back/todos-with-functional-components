module.exports = {
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['html', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
