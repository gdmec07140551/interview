# 26. 如何实现CSS的垂直居中？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

1. Flexbox方法（推荐）：

```css
.container {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    height: 100vh;
}
```

2. Grid方法：

```css
.container {
    display: grid;
    place-items: center;
    height: 100vh;
}

/* 或者 */
.container {
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100vh;
}
```

3. 绝对定位 + transform：

```css
.container {
    position: relative;
    height: 100vh;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

4. 绝对定位 + margin auto：

```css
.container {
    position: relative;
    height: 100vh;
}

.centered {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px; /* 需要固定宽度 */
    height: 100px; /* 需要固定高度 */
}
```

5. table-cell方法：

```css
.container {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 100vw;
    height: 100vh;
}
```

6. line-height方法（单行文本）：

```css
.container {
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.centered {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
}
```

7. 伪元素方法：

```css
.container {
    text-align: center;
    height: 100vh;
}

.container::before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.centered {
    display: inline-block;
    vertical-align: middle;
}
```

8. CSS Grid（单个子元素）：

```css
.container {
    display: grid;
    height: 100vh;
}

.centered {
    margin: auto;
}
```

9. 现代方法 - place-content：

```css
.container {
    display: grid;
    place-content: center;
    height: 100vh;
}
```

10. 多行文本垂直居中：

```css
.container {
    display: table;
    height: 200px;
    width: 100%;
}

.centered {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```

选择建议：

- 现代浏览器：优先使用Flexbox或Grid
- 需要兼容老浏览器：使用绝对定位 + transform
- 单行文本：使用line-height
- 已知尺寸：使用绝对定位 + margin auto
- 表格布局：使用table-cell

兼容性考虑：

```css
/* 兼容性方案 */
.container {
    /* 老浏览器回退 */
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    
    /* 现代浏览器 */
    display: flex;
    align-items: center;
    justify-content: center;
}
```

---
