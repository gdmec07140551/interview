# 5. 解释代码分割（Code Splitting）的概念和实现方式？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

代码分割是将代码分离到不同的bundle中，然后可以按需加载或并行加载这些文件。

实现方式：

1. 入口起点分割：

```javascript
module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  }
}
```

2. 防止重复（SplitChunksPlugin）：

```javascript
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

3. 动态导入：

```javascript
// 异步加载模块
import('./math.js').then(math => {
  console.log(math.add(16, 26));
});

// React.lazy
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```
