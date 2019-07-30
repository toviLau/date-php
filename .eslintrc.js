module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2015,
    // sourceType: 'module'
  },
  plugins: [
    "flowtype"
  ],
  extends: [
    'eslint:recommended',
    "plugin:flowtype/recommended"
  ],
  rules: {
    // 打包时禁止console/debugger/alert
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-debugger': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-alert': process.env.NODE_ENV !== 'production' ? 0 : 2,

    // 禁止将常量作为 if, for, while 里的测试条件，比如 if (true), for (;;)，除非循环内部有 break 语句
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
    // 强制 getter 函数中出现 return 语句，并且禁止返回空，比如 return;
    'getter-return': [2,
      {
        allowImplicit: false
      }
    ],

    // 禁止在 if, for, while 里使用赋值语句，除非这个赋值语句被括号包起来了
    'no-cond-assign': [2, 'except-parens'],

    // 强制2空格缩进
    'indent': ['error', 2],

    // 尾随逗号
    'comma-dangle': [2, {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }],

    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs':1,

    // 禁止使用空方法
    'no-empty': 1,
    'no-empty-function': 1,

    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing':'never',

    // 强制使用骆驼拼写法命名，变量名中禁止出现下划线'_'
    'camelcase': 2,

    // 要求 require() 出现在顶层模块作用域中
    'global-require': 0,

    // 强制一行的最大长度
    'max-len': [
      'error', {
        'code': 180, // 强制执行最大行长度
        'ignoreUrls': true, // 忽略包含 URL 的行
        'ignorePattern': true, // 忽略正则行
        'ignoreStrings': true, // 忽略包含双引号或单引号字符串的行
        'ignoreRegExpLiterals': true, // 忽略包含 RegExp 文字的行
        'ignoreTemplateLiterals': true, // 忽略包含模板文字的行
        'ignoreTrailingComments': true, // 忽略结尾注释
      }
    ],

    // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
    // @off 要求太严格了，有时需要在循环中写 await
    'no-await-in-loop': 2,

    // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
    // 开启此规则，因为字符串中一般不会出现 Ctrl 键，所以一旦出现了，可能是一个代码错误
    'no-control-regex': 2,

    // 禁止在函数参数中出现重复名称的参数
    'no-dupe-args': 2,

    // 禁扩展原始对象方法
    'no-extend-native': 1,

    // 不允许标签与变量同名
    'no-label-var': 2,

    // 不允许多个空行
    'no-multiple-empty-lines': 2,

    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': [2, { 'props': false }],

    // 禁用__proto__
    'no-proto': 2,

    // 禁止自身比较
    'no-self-compare': 2,

    // 不允许使用逗号操作符
    'no-sequences': 2,

    // 禁止将 undefined 作为标识符
    'no-undefined': 2,

    // 不允许初始化变量值为 undefined
    'no-undef-init': 2,

    // 禁用不必要的转义
    'no-useless-escape': 0, // (关闭)

    // 要求使用 let 或 const 而不是 var
    'no-var': 2,

    // 强制在花括号内使用一致的换行符
    'object-curly-newline': [2,
      { 'multiline': true }
    ],

    // 要求或禁止在变量声明周围换行
    'one-var-declaration-per-line': 2,

    // 解构相关
    'prefer-destructuring': ['error', {
        'array': true, // 启用数据解构
        'object': true // 启用对象解构
      }, {
      /**
       * 禁止直接重命名对象
       * 例如：
       *   let foo = object.bar;
       * 正确做法
       *   let { bar: foo } = object
       */
      'enforceForRenamedProperties': true
    }],
    // 字符串使用单引号
    'quotes': [2, 'single'],

    // 关闭语句强制分号结尾
    'semi': [1, 'always'],

    // 强制在 parseInt() 使用基数参数
    'radix': 2,

    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 2,
  }
}
