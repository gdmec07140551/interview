# 12. 什么是ESLint？如何配置和使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

ESLint是一个用于识别和报告JavaScript代码中模式匹配的工具，目标是保证代码的一致性和避免错误。

主要功能：

- 语法错误检查
- 代码风格检查
- 潜在问题检查
- 自动修复部分问题

配置方式：

1. 配置文件（.eslintrc.js）：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
}
```

2. 集成到构建工具：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  }
}
```
