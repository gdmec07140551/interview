# 13. 什么是Prettier？它与ESLint有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Prettier：

- 代码格式化工具
- 专注于代码风格统一
- 支持多种语言
- 配置项较少，固执己见

ESLint：

- 代码质量检查工具
- 专注于代码质量和潜在错误
- 主要针对JavaScript
- 配置灵活，规则丰富

主要区别：

- 职责不同：Prettier负责格式化，ESLint负责代码质量
- 冲突处理：某些规则可能冲突，需要配置解决
- 使用场景：通常配合使用，各司其职

配合使用：

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier' // 关闭与Prettier冲突的规则
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
```
