# 21. 如何实现CSS三角形？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

基本原理：

利用border属性，将元素的宽高设为0，通过设置不同方向的border来形成三角形。

1. 向上的三角形：

```css
.triangle-up {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 40px solid #333;
}
```

2. 向下的三角形：

```css
.triangle-down {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 40px solid #333;
}
```

3. 向左的三角形：

```css
.triangle-left {
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-right: 40px solid #333;
}
```

4. 向右的三角形：

```css
.triangle-right {
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 40px solid #333;
}
```

其他形状：

5. 等腰直角三角形：

```css
.triangle-right-angle {
    width: 0;
    height: 0;
    border-top: 50px solid #333;
    border-right: 50px solid transparent;
}
```

6. 聊天气泡：

```css
.chat-bubble {
    position: relative;
    background: #333;
    padding: 10px 15px;
    border-radius: 10px;
    color: white;
}

.chat-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #333;
}
```

现代替代方案：

1. 使用clip-path：

```css
.triangle-clip {
    width: 100px;
    height: 100px;
    background: #333;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

2. 使用transform：

```css
.triangle-transform {
    width: 50px;
    height: 50px;
    background: #333;
    transform: rotate(45deg);
}
```

3. 使用SVG：

```html
<svg width="100" height="100">
    <polygon points="50,0 0,100 100,100" fill="#333" />
</svg>
```

---
