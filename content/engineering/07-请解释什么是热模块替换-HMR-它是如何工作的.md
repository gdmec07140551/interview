# 7. 请解释什么是热模块替换（HMR），它是如何工作的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

热模块替换允许在运行时更新各种模块，而无需进行完整刷新。

工作原理：

1. 文件监听：

- Webpack监听文件变化

2. 编译更新：

- 重新编译发生变化的模块

3. 推送更新：

- 通过WebSocket将更新推送到浏览器

4. 模块替换：

- 浏览器接收更新，替换旧模块

配置示例：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

// 代码中接受HMR
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // 处理更新逻辑
  })
}
```
