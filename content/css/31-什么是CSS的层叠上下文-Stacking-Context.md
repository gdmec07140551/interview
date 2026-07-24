# 31. 什么是CSS的层叠上下文（Stacking Context）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

层叠上下文定义：

层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向视窗或网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

创建层叠上下文的条件：

1. 根元素（html）：

```html
<html> <!-- 根层叠上下文 -->
```

2. position + z-index：

```css
.context {
    position: relative; /* 或 absolute, fixed */
    z-index: 1; /* z-index不为auto */
}
```

3. flex/grid项目 + z-index：

```css
.flex-container {
    display: flex;
}

.flex-item {
    z-index: 1; /* flex项目且z-index不为auto */
}
```

4. opacity小于1：

```css
.transparent {
    opacity: 0.9; /* 创建层叠上下文 */
}
```

5. transform不为none：

```css
.transformed {
    transform: translateZ(0); /* 或任何transform值 */
}
```

6. filter不为none：

```css
.filtered {
    filter: blur(5px); /* 或任何filter值 */
}
```

7. mix-blend-mode不为normal：

```css
.blended {
    mix-blend-mode: multiply;
}
```

8. isolation为isolate：

```css
.isolated {
    isolation: isolate;
}
```

9. will-change指定任何会创建层叠上下文的属性：

```css
.will-change {
    will-change: transform, opacity;
}
```

10. contain为layout、paint或包含它们的复合值：

```css
.contained {
    contain: layout;
    /* 或 contain: paint; */
    /* 或 contain: layout paint; */
}
```

层叠顺序（从底到顶）：

```css
/* 在同一个层叠上下文中的层叠顺序 */
.stacking-order {
    /* 1. 层叠上下文的根元素 */
    /* 2. z-index为负值的定位元素（及其子元素） */
    /* 3. 非定位的块级元素 */
    /* 4. 非定位的浮动元素 */
    /* 5. 非定位的行内元素 */
    /* 6. z-index为auto的定位元素（及其子元素） */
    /* 7. z-index为正值的定位元素（及其子元素） */
}
```

示例演示：

1. 基本层叠上下文：

```html
<div class="container">
    <div class="item item-1">Item 1 (z-index: 1)</div>
    <div class="item item-2">Item 2 (z-index: 2)</div>
    <div class="item item-3">Item 3 (z-index: 3)</div>
</div>
```

```css
.container {
    position: relative; /* 创建层叠上下文 */
    z-index: 0;
}

.item {
    position: absolute;
    width: 100px;
    height: 100px;
}

.item-1 {
    background: red;
    z-index: 1;
    top: 0;
    left: 0;
}

.item-2 {
    background: green;
    z-index: 2;
    top: 20px;
    left: 20px;
}

.item-3 {
    background: blue;
    z-index: 3;
    top: 40px;
    left: 40px;
}
```

2. 嵌套层叠上下文的陷阱：

```html
<div class="parent-1">
    <div class="child-1">Child 1 (z-index: 100)</div>
</div>
<div class="parent-2">
    <div class="child-2">Child 2 (z-index: 1)</div>
</div>
```

```css
.parent-1 {
    position: relative;
    z-index: 1; /* 创建层叠上下文 */
    background: rgba(255, 0, 0, 0.3);
}

.parent-2 {
    position: relative;
    z-index: 2; /* 创建层叠上下文 */
    background: rgba(0, 255, 0, 0.3);
}

.child-1 {
    position: relative;
    z-index: 100; /* 在parent-1的层叠上下文中 */
    background: red;
}

.child-2 {
    position: relative;
    z-index: 1; /* 在parent-2的层叠上下文中 */
    background: green;
}

/* 结果：child-2会在child-1上面，因为parent-2的z-index更大 */
```

3. opacity创建的层叠上下文：

```css
.opacity-context {
    opacity: 0.99; /* 创建层叠上下文 */
    position: relative;
}

.opacity-child {
    position: relative;
    z-index: -1; /* 在opacity-context的层叠上下文中 */
    background: blue;
}
```

4. transform创建的层叠上下文：

```css
.transform-context {
    transform: translateZ(0); /* 创建层叠上下文 */
    position: relative;
}

.transform-child {
    position: relative;
    z-index: -1;
    background: purple;
}
```

调试层叠上下文：

1. 使用浏览器开发者工具：

```javascript
// 检查元素是否创建了层叠上下文
function checkStackingContext(element) {
    const computed = getComputedStyle(element);
    
    const conditions = [
        computed.position !== 'static' && computed.zIndex !== 'auto',
        computed.opacity !== '1',
        computed.transform !== 'none',
        computed.filter !== 'none',
        computed.mixBlendMode !== 'normal',
        computed.isolation === 'isolate'
    ];
    
    return conditions.some(condition => condition);
}
```

2. CSS调试技巧：

```css
/* 给所有可能创建层叠上下文的元素添加边框 */
*[style*="z-index"],
*[style*="opacity"],
*[style*="transform"],
*[style*="filter"] {
    outline: 2px solid red !important;
}
```

常见问题和解决方案：

1. z-index不生效：

```css
/* 问题：z-index对static元素无效 */
.problem {
    z-index: 999; /* 无效 */
}

/* 解决：给元素定位 */
.solution {
    position: relative; /* 或 absolute, fixed */
    z-index: 999;
}
```

2. 子元素无法超越父元素的层叠上下文：

```css
/* 问题：子元素被限制在父元素的层叠上下文中 */
.parent {
    position: relative;
    z-index: 1;
}

.child {
    position: relative;
    z-index: 9999; /* 无法超越其他z-index为2的元素 */
}

/* 解决：调整父元素的z-index或结构 */
.parent {
    position: relative;
    z-index: 10; /* 提高父元素的z-index */
}
```

最佳实践：

- 理解层叠上下文的创建条件
- 避免过度使用z-index
- 使用有意义的z-index分层策略
- 在复杂布局中谨慎使用transform、opacity等属性
- 使用CSS架构方法管理层叠关系

---
