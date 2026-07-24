# 28. 什么是PWA？如何提升性能？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

PWA（Progressive Web App）是使用现代Web技术构建的应用，提供类似原生应用的体验。

性能优化特性：

- Service Worker：离线缓存和后台同步
- App Shell模式：快速加载应用外壳
- 预缓存策略：关键资源预缓存
- 推送通知：提升用户参与度

```javascript
// service-worker.js
const CACHE_NAME = 'app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/icon.png'
];

// 安装时预缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截请求，优先从缓存读取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 注册Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```
