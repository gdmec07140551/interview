# 24. 如何实现CSS动画的性能优化？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

1. 使用transform和opacity：

这两个属性不会触发重排（reflow），只会触发重绘（repaint）或合成（composite）。

```css
/* 好的做法 */
.animate {
    transform: translateX(100px);
    opacity: 0.5;
    transition: transform 0.3s, opacity 0.3s;
}

/* 避免的做法 */
.animate {
    left: 100px; /* 会触发重排 */
    width: 200px; /* 会触发重排 */
}
```

2. 启用硬件加速：

```css
.accelerated {
    transform: translateZ(0); /* 或 translate3d(0,0,0) */
    /* 或者 */
    will-change: transform;
}
```

3. 使用will-change属性：

```css
.element {
    will-change: transform, opacity;
}

/* 动画结束后移除 */
.element.animation-finished {
    will-change: auto;
}
```

4. 避免动画期间的重排属性：

```css
/* 会触发重排的属性（避免动画） */
.bad {
    animation: badAnimation 1s;
}

@keyframes badAnimation {
    from { width: 100px; height: 100px; }
    to { width: 200px; height: 200px; }
}

/* 好的替代方案 */
.good {
    animation: goodAnimation 1s;
}

@keyframes goodAnimation {
    from { transform: scale(1); }
    to { transform: scale(2); }
}
```

5. 使用CSS动画而非JavaScript：

```css
/* CSS动画 - 更好的性能 */
.css-animation {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

6. 合理使用动画时长和缓动函数：

```css
.smooth {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 避免过长的动画时间 */
.too-slow {
    transition: transform 2s; /* 用户可能感到不耐烦 */
}
```

7. 减少同时运行的动画数量：

```javascript
// 使用requestAnimationFrame控制动画
function animate() {
    // 批量更新DOM
    elements.forEach(el => {
        el.style.transform = `translateX(${getNewPosition()}px)`;
    });
    
    requestAnimationFrame(animate);
}
```

8. 使用transform3d强制开启GPU加速：

```css
.gpu-accelerated {
    transform: translate3d(0, 0, 0);
    /* 或者 */
    transform: translateZ(0);
    /* 或者 */
    backface-visibility: hidden;
}
```

9. 避免在动画中使用box-shadow：

```css
/* 性能较差 */
.shadow-animation {
    transition: box-shadow 0.3s;
}
.shadow-animation:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

/* 更好的替代方案 */
.pseudo-shadow {
    position: relative;
}
.pseudo-shadow::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity 0.3s;
}
.pseudo-shadow:hover::after {
    opacity: 1;
}
```

10. 性能监控和调试：

```javascript
// 使用Performance API监控
performance.mark('animation-start');
// 动画代码
performance.mark('animation-end');
performance.measure('animation-duration', 'animation-start', 'animation-end');
```

最佳实践总结：

- 优先使用transform和opacity
- 合理使用will-change
- 避免在动画中修改布局属性
- 使用CSS动画替代JavaScript动画
- 监控和测试动画性能

---
