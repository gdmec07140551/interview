# 24. 什么是资源提示（Resource Hints）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

资源提示是HTML5规范，允许开发者向浏览器提供关于资源加载的提示。

类型：

- dns-prefetch：DNS预解析
- preconnect：预连接
- preload：预加载
- prefetch：预取
- prerender：预渲染

```html
<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">

<!-- 预连接（包含DNS解析、TCP握手、TLS协商） -->
<link rel="preconnect" href="//fonts.gstatic.com" crossorigin>

<!-- 预加载当前页面需要的资源 -->
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero.jpg" as="image">

<!-- 预取用户可能访问的资源 -->
<link rel="prefetch" href="/next-page.html">

<!-- 预渲染整个页面 -->
<link rel="prerender" href="/landing-page.html">
```
