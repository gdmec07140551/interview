# 14. CSS中的float属性及其清除浮动的方法？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

float属性：

- left：元素向左浮动
- right：元素向右浮动
- none：默认值，不浮动

浮动的特性：

1. 脱离文档流
2. 向左或向右移动，直到碰到容器边缘或另一个浮动元素
3. 浮动元素会尽可能向上移动
4. 浮动元素不会超出包含块

清除浮动的方法：

1. 使用clear属性：

```css
.clear {
    clear: both; /* left | right | both */
}
```

2. 父元素添加overflow：

```css
.clearfix {
    overflow: hidden; /* 或 auto */
}
```

3. 使用伪元素清除：

```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

4. 父元素也浮动：

```css
.parent {
    float: left;
    width: 100%;
}
```

5. 使用display: flow-root：

```css
.clearfix {
    display: flow-root;
}
```

现代替代方案：

- 使用Flexbox布局
- 使用Grid布局
- 避免使用float进行布局

---
