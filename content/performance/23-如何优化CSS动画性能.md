# 23. 如何优化CSS动画性能？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

- 使用transform和opacity：触发GPU加速，避免重排重绘
- will-change属性：提示浏览器优化动画元素
- 避免动画布局属性：width、height、margin等
- 使用CSS3动画：优于JavaScript动画
- 合理使用硬件加速：避免过度使用导致内存问题

```css
/* 高性能动画 */
.optimized-animation {
  will-change: transform;
  transform: translateZ(0); /* 创建合成层 */
  transition: transform 0.3s ease-out;
}

.optimized-animation:hover {
  transform: translateX(100px) scale(1.1);
}

/* 避免的动画属性 */
.bad-animation {
  transition: width 0.3s; /* 会触发重排 */
}

/* 使用transform替代 */
.good-animation {
  transform: scaleX(1.2); /* 只触发合成 */
}
```
