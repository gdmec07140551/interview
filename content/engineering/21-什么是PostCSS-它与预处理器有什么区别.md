# 21. 什么是PostCSS？它与预处理器有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

PostCSS是一个用JavaScript工具和插件转换CSS代码的工具。

PostCSS特点：

- 插件化架构：功能通过插件实现
- 后处理：处理已有的CSS
- 可定制：可以选择需要的功能
- 性能好：只处理需要的部分

与预处理器的区别：

- 处理时机：PostCSS是后处理，预处理器是预处理
- 语法：PostCSS使用标准CSS语法
- 功能：PostCSS通过插件扩展，预处理器有固定语法
- 兼容性：PostCSS可以处理现有CSS

常用插件：

- autoprefixer：自动添加浏览器前缀
- cssnano：CSS压缩优化
- postcss-preset-env：使用未来CSS语法
- postcss-import：处理@import

配置示例：

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
```
