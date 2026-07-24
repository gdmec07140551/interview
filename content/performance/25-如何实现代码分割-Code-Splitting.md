# 25. 如何实现代码分割（Code Splitting）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

代码分割是将代码拆分成多个bundle，实现按需加载的技术。

分割策略：

- 入口分割：多个入口点
- 动态导入：import()语法
- 第三方库分割：vendor chunk

```javascript
// 动态导入
const loadComponent = async () => {
  const { default: Component } = await import('./HeavyComponent');
  return Component;
};

// React代码分割
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// webpack配置
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
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        }
      }
    }
  }
};
```
