# 18. 什么是Web Vitals？如何监控和优化？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

Web Vitals是Google提出的用户体验质量指标集合。

核心指标：

- LCP：最大内容绘制 (&lt;2.5s)
- FID：首次输入延迟 (&lt;100ms)  
- CLS：累积布局偏移 (&lt;0.1)

监控方法：

```javascript
// 使用web-vitals库
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// 自定义上报
function sendToAnalytics(metric) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(metric)
  });
}
```
