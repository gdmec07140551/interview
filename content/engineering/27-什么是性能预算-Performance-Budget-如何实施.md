# 27. 什么是性能预算（Performance Budget）？如何实施？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

性能预算是为网站或应用设定的性能指标限制，用于确保用户体验不会因为功能增加而降低。

常见指标：

- 包大小：JavaScript、CSS文件大小
- 加载时间：首屏加载时间、完全加载时间
- 网络请求：HTTP请求数量
- Core Web Vitals：LCP、FID、CLS等

实施方法：

1. Webpack Bundle Analyzer：

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
}
```

2. 大小限制：

```javascript
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 250000,      // 250kb
    maxEntrypointSize: 250000, // 250kb
    hints: 'error'
  }
}
```

3. CI/CD集成：

```yaml
# GitHub Actions
- name: Check bundle size
  run: |
    npm run build
    npx bundlesize
```

4. 监控工具：

- Lighthouse CI：自动化性能测试
- WebPageTest：性能分析
- Bundle Size Bot：PR中显示包大小变化
