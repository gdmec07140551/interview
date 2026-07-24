# 23. 解释什么是Bundle Splitting和Chunk？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Bundle：

- Webpack打包后的文件
- 包含多个模块的代码集合
- 最终输出到dist目录的文件

Chunk：

- Webpack内部用来管理打包过程的代码块
- 一个Chunk可能包含多个模块
- 最终会生成一个或多个Bundle

Bundle Splitting策略：

1. 入口分割：

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  }
}
```

2. SplitChunksPlugin：

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      },
      common: {
        minChunks: 2,
        chunks: 'all',
        name: 'common'
      }
    }
  }
}
```

3. 动态导入：

```javascript
// 创建新的Chunk
import('./lazy-module.js').then(module => {
  // 使用模块
});
```

优势：

- 减少初始加载时间
- 更好的缓存策略
- 按需加载
