# 30. CSS中的clip-path属性如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

clip-path定义：

clip-path属性用于创建一个剪切路径，只有路径内的部分会被显示，路径外的部分会被隐藏。

基本语法：

```css
.element {
    clip-path: <clip-source> | <basic-shape> | <geometry-box> | none;
}
```

基本形状（basic-shape）：

1. circle()圆形：

```css
.circle {
    clip-path: circle(50px at center);
    /* circle(半径 at 圆心位置) */
}

.circle-percentage {
    clip-path: circle(50% at 50% 50%);
}

.circle-offset {
    clip-path: circle(60px at 30% 70%);
}
```

2. ellipse()椭圆：

```css
.ellipse {
    clip-path: ellipse(100px 50px at center);
    /* ellipse(水平半径 垂直半径 at 中心位置) */
}

.ellipse-percentage {
    clip-path: ellipse(50% 25% at 50% 50%);
}
```

3. polygon()多边形：

```css
/* 三角形 */
.triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* 梯形 */
.trapezoid {
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}

/* 六边形 */
.hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

/* 星形 */
.star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
```

4. inset()矩形：

```css
.inset-basic {
    clip-path: inset(20px);
    /* 四边都内缩20px */
}

.inset-detailed {
    clip-path: inset(10px 20px 30px 40px);
    /* 上 右 下 左 */
}

.inset-rounded {
    clip-path: inset(20px round 10px);
    /* 内缩20px，圆角10px */
}
```

实际应用场景：

1. 图片裁剪效果：

```css
.image-clip {
    width: 300px;
    height: 200px;
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
    transition: clip-path 0.3s ease;
}

.image-clip:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

2. 按钮特殊形状：

```css
.arrow-button {
    background: #3498db;
    color: white;
    padding: 10px 20px;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%);
    border: none;
    cursor: pointer;
}
```

3. 卡片切角效果：

```css
.card {
    background: white;
    padding: 20px;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

4. 加载动画：

```css
.loading-circle {
    width: 50px;
    height: 50px;
    background: #3498db;
    clip-path: circle(25px at center);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { clip-path: circle(0px at center); }
    50% { clip-path: circle(25px at center); }
    100% { clip-path: circle(0px at center); }
}
```

5. 文字遮罩效果：

```css
.text-reveal {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    clip-path: inset(0 100% 0 0);
    animation: reveal 2s ease-in-out forwards;
}

@keyframes reveal {
    to { clip-path: inset(0 0 0 0); }
}
```

动画效果：

1. 形状变换动画：

```css
.morph {
    width: 200px;
    height: 200px;
    background: #e74c3c;
    clip-path: circle(50% at center);
    transition: clip-path 0.5s ease;
}

.morph:hover {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

2. 进场动画：

```css
.slide-in {
    clip-path: inset(0 100% 0 0);
    animation: slideIn 1s ease-out forwards;
}

@keyframes slideIn {
    to { clip-path: inset(0 0 0 0); }
}
```

与SVG结合使用：

1. 使用SVG路径：

```html
<svg width="0" height="0">
    <defs>
        <clipPath id="myClip">
            <path d="M50,0 L100,50 L50,100 L0,50 Z"/>
        </clipPath>
    </defs>
</svg>
```

```css
.svg-clip {
    clip-path: url(#myClip);
}
```

工具和资源：

1. 在线生成工具：

- Clippy (https://bennettfeely.com/clippy/)
- CSS clip-path maker

2. 调试技巧：

```css
.debug {
    /* 添加边框查看裁剪效果 */
    border: 2px solid red;
    
    /* 或者添加背景色 */
    background: rgba(255, 0, 0, 0.2);
}
```

浏览器兼容性：

- Chrome 55+
- Firefox 54+
- Safari 9.1+
- IE不支持
- 需要-webkit-前缀的旧版本浏览器

性能注意事项：

- clip-path会创建新的层叠上下文
- 复杂路径可能影响性能
- 避免在动画中使用过于复杂的路径
- 可以使用will-change优化动画性能

---
