# 5. CSS性能优化有哪些方法？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

- 选择器优化：避免复杂选择器，减少嵌套层级
- CSS压缩：移除空格、注释，合并相同规则
- 避免@import：使用link标签代替@import
- CSS3硬件加速：使用transform、opacity触发GPU加速
- 移除未使用CSS：工具如PurgeCSS清理无用样式

```css
/* 避免复杂选择器 */
/* 不好 */
.nav ul li a span { color: red; }

/* 好 */
.nav-link-text { color: red; }

/* 触发硬件加速 */
.animated {
  transform: translateZ(0);
  will-change: transform;
}
```
