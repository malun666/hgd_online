module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    amd: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {
    NODE_ENV: false
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off',
    'space-before-function-paren': ['error', 'never'],
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    'no-unused-vars': 0, //解决变量申明未使用的提示
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ]
  }
};
