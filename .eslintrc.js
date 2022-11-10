module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
    },
  },
};
