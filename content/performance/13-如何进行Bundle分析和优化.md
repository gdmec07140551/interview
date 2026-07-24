# 13. 如何进行Bundle分析和优化？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

分析工具：

- webpack-bundle-analyzer：可视化bundle组成
- source-map-explorer：分析源码占用
- bundlephobia：分析npm包大小

优化策略：

- 代码分割：按路由/功能分割
- Tree Shaking：移除未使用代码
- 外部依赖：大型库使用CDN
- 动态导入：按需加载模块

```javascript
// webpack配置示例
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```
