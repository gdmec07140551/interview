# 4. 什么是Tree Shaking？它的原理是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Tree Shaking是一种通过静态分析来移除JavaScript上下文中未引用代码的技术。

原理：

- 基于ES6模块的静态结构特性
- 在编译时确定模块的导入导出关系
- 标记未使用的导出，在压缩阶段删除

实现条件：

- 使用ES6模块语法
- 确保代码没有副作用（side effects）
- 使用支持Tree Shaking的打包工具
- 在生产模式下启用

配置示例：

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false
  }
}
```
