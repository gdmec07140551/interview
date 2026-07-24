# 14. 什么是Service Worker？如何用于性能优化？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

Service Worker是运行在后台的脚本，可以拦截网络请求，实现离线缓存和推送通知。

性能优化应用：

- 缓存策略：实现复杂的缓存逻辑
- 离线访问：缓存关键资源，支持离线浏览
- 预缓存：在空闲时预加载资源
- 网络优化：智能选择缓存或网络

```javascript
// service-worker.js
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open('images').then(cache => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});
```
