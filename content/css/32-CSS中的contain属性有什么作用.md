# 32. CSS中的contain属性有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

contain属性定义：

contain属性允许开发者指定特定的DOM元素和它的子元素，让它们能够独立于整个DOM树结构之外。这个属性对于性能优化非常有用。

语法：

```css
.element {
    contain: none | strict | content | size | layout | style | paint | inline-size;
}
```

各个值的含义：

1. none（默认值）：

```css
.no-contain {
    contain: none; /* 不应用任何包含 */
}
```

2. size：

```css
.size-contain {
    contain: size;
    /* 元素的尺寸计算不依赖于其子元素的内容 */
    /* 必须明确指定元素的尺寸 */
    width: 300px;
    height: 200px;
}
```

3. layout：

```css
.layout-contain {
    contain: layout;
    /* 元素外部无法影响其内部布局，反之亦然 */
    /* 元素建立独立的格式化上下文 */
}
```

4. style：

```css
.style-contain {
    contain: style;
    /* 计数器和引用的作用域限制在该元素内 */
}
```

5. paint：

```css
.paint-contain {
    contain: paint;
    /* 元素的后代不会显示在其边界之外 */
    /* 类似于 overflow: hidden */
}
```

6. inline-size：

```css
.inline-size-contain {
    contain: inline-size;
    /* 元素的内联尺寸计算不依赖于其子元素 */
}
```

复合值：

7. content：

```css
.content-contain {
    contain: content;
    /* 等价于 contain: layout style paint */
}
```

8. strict：

```css
.strict-contain {
    contain: strict;
    /* 等价于 contain: size layout style paint */
}
```

实际应用场景：

1. 独立组件优化：

```css
.widget {
    contain: layout style paint;
    /* 小部件的内部变化不会影响页面其他部分 */
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    overflow: hidden;
}

.widget-content {
    /* 内部内容的变化被包含在widget内 */
    position: relative;
}
```

2. 无限滚动列表：

```css
.infinite-list {
    contain: layout style paint;
    height: 400px;
    overflow-y: auto;
}

.list-item {
    contain: layout paint;
    height: 50px;
    /* 每个列表项的变化不会影响其他项 */
}
```

3. 卡片组件：

```css
.card {
    contain: layout paint;
    width: 250px;
    min-height: 200px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
}

.card-content {
    padding: 16px;
}
```

4. 模态框：

```css
.modal {
    contain: layout style paint;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-height: 80vh;
    background: white;
    border-radius: 8px;
    overflow: auto;
}
```

5. 图表组件：

```css
.chart-container {
    contain: size layout paint;
    width: 400px;
    height: 300px;
    /* 图表内部的重新渲染不会影响页面其他部分 */
}
```

性能优化效果：

1. 减少重排（Reflow）：

```css
.optimized-section {
    contain: layout;
    /* 内部元素的布局变化不会触发外部重排 */
}

.dynamic-content {
    /* 内容的动态变化被包含 */
    height: auto;
}
```

2. 减少重绘（Repaint）：

```css
.paint-optimized {
    contain: paint;
    /* 内部绘制操作不会影响外部 */
    animation: colorChange 2s infinite;
}

@keyframes colorChange {
    0% { background: red; }
    50% { background: blue; }
    100% { background: red; }
}
```

3. 样式计算优化：

```css
.style-optimized {
    contain: style;
    /* CSS计数器等样式计算被限制在内部 */
    counter-reset: item;
}

.item {
    counter-increment: item;
}

.item::before {
    content: counter(item) ". ";
}
```

与其他CSS属性的关系：

1. 与overflow的区别：

```css
/* overflow只是裁剪视觉内容 */
.overflow-hidden {
    overflow: hidden;
    width: 200px;
    height: 200px;
}

/* contain: paint 还会创建包含块 */
.paint-contained {
    contain: paint;
    width: 200px;
    height: 200px;
}
```

2. 与position的配合：

```css
.positioned-container {
    position: relative;
    contain: layout;
    /* 为内部绝对定位元素提供包含块 */
}

.absolute-child {
    position: absolute;
    top: 0;
    left: 0;
    /* 相对于.positioned-container定位 */
}
```

注意事项和限制：

1. size包含的要求：

```css
.size-contained {
    contain: size;
    /* 必须明确指定尺寸，否则可能为0 */
    width: 300px;
    height: 200px;
}
```

2. 可访问性考虑：

```css
.accessible-contained {
    contain: layout paint;
    /* 确保辅助技术仍能访问内容 */
    /* 避免过度使用可能影响屏幕阅读器 */
}
```

3. 调试困难：

```css
/* 开发时可以临时禁用contain */
.debug-mode .contained {
    contain: none !important;
}
```

浏览器兼容性：

- Chrome 52+
- Firefox 69+
- Safari 15.4+
- IE不支持

检测支持：

```javascript
// 检测contain属性支持
function supportsContain() {
    return CSS.supports('contain', 'layout');
}

if (supportsContain()) {
    document.body.classList.add('supports-contain');
}
```

最佳实践：

- 在独立组件上使用contain
- 避免在根元素或大容器上使用strict
- 结合性能监控工具测试效果
- 在复杂动画组件中优先考虑使用
- 注意可访问性影响

---
