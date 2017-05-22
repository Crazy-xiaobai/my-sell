// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 以分号结尾
    'semi': ["error", "always"],
    // 是否检查缩进格式
    // 'indent': 0,
    // 在文件末尾需要或禁止换行
    // 'eol-last': 0,
    // 是否在函数括号前添加一个空格
    'space-before-function-paren': 0,
    // 不检查注释格式
    'spaced-comment': 0
  }
}
