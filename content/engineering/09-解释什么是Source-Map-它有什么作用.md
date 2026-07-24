# 9. 解释什么是Source Map，它有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Source Map是一个信息文件，里面储存着位置信息，用于调试压缩/编译后的代码。

作用：

- 将压缩/编译后的代码映射回原始源代码
- 便于在浏览器中调试
- 保持生产环境代码的优化，同时保证开发体验

类型：

- eval：每个模块使用eval()执行，并生成DataUrl形式的SourceMap
- source-map：生成独立的.map文件
- inline-source-map：将SourceMap以DataURL形式嵌入
- cheap-source-map：不包含列信息，只有行信息
- hidden-source-map：生成SourceMap但不在bundle中引用

配置：

```javascript
// webpack.config.js
module.exports = {
  devtool: 'source-map' // 生产环境
  // devtool: 'eval-source-map' // 开发环境
}
```
