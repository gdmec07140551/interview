# 3. 如何减少HTTP请求数量？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

- 资源合并：CSS/JS文件合并，雪碧图（CSS Sprites）
- 内联资源：小图片转base64，关键CSS内联
- 懒加载：图片、组件按需加载
- 缓存策略：利用浏览器缓存减少重复请求
- CDN加速：静态资源使用CDN分发
- HTTP/2：利用多路复用特性

```javascript
// 图片懒加载示例
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));
```
