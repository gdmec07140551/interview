# 16. 什么是关键CSS？如何提取和使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

关键CSS是渲染首屏内容所必需的最小CSS集合。

提取方法：

- 工具：Critical、Penthouse、UnCSS
- 手动分析：识别首屏元素对应样式
- 自动化：构建流程中自动提取

使用策略：

```html
<!-- 内联关键CSS -->
<style>
  /* 首屏关键样式 */
  .header { display: flex; height: 60px; }
  .hero { min-height: 400px; }
</style>

<!-- 异步加载完整CSS -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
```
