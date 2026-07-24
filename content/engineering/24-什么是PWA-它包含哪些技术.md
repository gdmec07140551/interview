# 24. 什么是PWA？它包含哪些技术？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

PWA（Progressive Web App）是一种使用现代Web技术构建的应用程序，提供类似原生应用的用户体验。

核心技术：

1. Service Worker：

- 在后台运行的脚本
- 提供离线功能
- 拦截网络请求
- 推送通知

2. Web App Manifest：

- JSON文件，定义应用元数据
- 支持添加到主屏幕
- 定义启动画面、图标等

3. HTTPS：

- 安全连接要求
- Service Worker的前提条件

实现示例：

manifest.json：

```json
{
  "name": "My PWA App",
  "short_name": "PWA App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

Service Worker：

```javascript
// 缓存策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```
