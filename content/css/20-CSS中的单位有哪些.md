# 20. CSS中的单位有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

绝对单位：

1. px（像素）：

```css
.box {
    width: 300px;
    height: 200px;
}
```

2. pt（点）：

- 1pt = 1/72英寸
- 主要用于打印样式

3. pc（派卡）：

- 1pc = 12pt

4. in（英寸）、cm（厘米）、mm（毫米）：

```css
@media print {
    .page {
        width: 8.5in;
        height: 11in;
    }
}
```

相对单位：

1. em：

- 相对于当前元素的字体大小

```css
.parent {
    font-size: 16px;
}
.child {
    font-size: 1.5em; /* 24px */
    padding: 1em; /* 24px */
}
```

2. rem：

- 相对于根元素的字体大小

```css
html {
    font-size: 16px;
}
.text {
    font-size: 1.2rem; /* 19.2px */
    margin: 2rem; /* 32px */
}
```

3. %（百分比）：

```css
.container {
    width: 80%; /* 相对于父元素宽度 */
    font-size: 120%; /* 相对于父元素字体大小 */
}
```

视口单位：

1. vw（视口宽度）：

- 1vw = 视口宽度的1%

```css
.full-width {
    width: 100vw;
}
```

2. vh（视口高度）：

- 1vh = 视口高度的1%

```css
.full-height {
    height: 100vh;
}
```

3. vmin和vmax：

```css
.square {
    width: 50vmin; /* 视口较小尺寸的50% */
    height: 50vmin;
}
```

新单位（CSS3+）：

1. ch：

- 相对于字符"0"的宽度

```css
.monospace {
    width: 40ch; /* 大约40个字符宽度 */
}
```

2. ex：

- 相对于字母"x"的高度

使用建议：

- 字体大小：rem
- 间距：rem或em
- 边框：px
- 布局宽度：%或vw
- 响应式设计：相对单位优先

---
