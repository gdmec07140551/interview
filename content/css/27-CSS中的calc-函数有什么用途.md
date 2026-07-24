# 27. CSS中的calc()函数有什么用途？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

calc()函数定义：

calc()允许在CSS中进行数学计算，可以混合使用不同的单位进行运算。

基本语法：

```css
.element {
    width: calc(expression);
}
```

支持的运算符：

- +（加法）
- -（减法）
- *（乘法）
- /（除法）

常用场景：

1. 混合单位计算：

```css
.container {
    width: calc(100% - 200px); /* 百分比减去固定像素 */
    height: calc(100vh - 60px); /* 视口高度减去头部高度 */
    margin: calc(1rem + 5px); /* rem加上像素 */
}
```

2. 响应式布局：

```css
.sidebar {
    width: 300px;
    float: left;
}

.content {
    width: calc(100% - 300px); /* 剩余宽度 */
    float: right;
}

/* 三栏布局 */
.left { width: 200px; }
.right { width: 150px; }
.center { width: calc(100% - 350px); }
```

3. 网格布局计算：

```css
.grid-item {
    width: calc(33.333% - 20px); /* 三列布局，减去间距 */
    margin-right: 20px;
}

/* 考虑边距的等分布局 */
.four-columns {
    width: calc((100% - 60px) / 4); /* 四列，总间距60px */
}
```

4. 垂直居中计算：

```css
.centered {
    position: absolute;
    top: calc(50% - 100px); /* 50%减去元素高度的一半 */
    left: calc(50% - 150px); /* 50%减去元素宽度的一半 */
    width: 300px;
    height: 200px;
}
```

5. 字体大小响应式：

```css
.responsive-text {
    font-size: calc(16px + 1vw); /* 基础16px加上视口宽度的1% */
}

.title {
    font-size: calc(1.5rem + 2vw); /* 响应式标题 */
}
```

6. 动态间距：

```css
.section {
    padding: calc(2rem + 5vh) calc(1rem + 2vw);
}

.card {
    margin-bottom: calc(1em + 1vh);
}
```

7. 表单布局：

```css
.form-group {
    width: calc(50% - 10px); /* 两列表单，考虑间距 */
    display: inline-block;
    margin-right: 20px;
}

.input-with-button {
    width: calc(100% - 120px); /* 输入框宽度，减去按钮宽度 */
}

.button {
    width: 100px;
}
```

8. 复杂计算：

```css
.complex {
    width: calc((100% - 40px) / 3 - 20px);
    /* 三等分，减去容器左右边距40px，再减去元素间距20px */
    
    height: calc(100vh - 80px - 2em);
    /* 视口高度减去头部80px再减去2em的底部间距 */
}
```

注意事项：

1. 运算符两边必须有空格：

```css
/* 正确 */
width: calc(100% - 20px);

/* 错误 */
width: calc(100%-20px);
```

2. 除法运算的除数不能为0：

```css
/* 错误 */
width: calc(100px / 0);
```

3. 嵌套使用：

```css
.nested {
    width: calc(calc(100% / 3) - 20px);
    /* 可以嵌套，但建议简化 */
    
    /* 更好的写法 */
    width: calc(100% / 3 - 20px);
}
```

4. 与CSS变量结合：

```css
:root {
    --sidebar-width: 250px;
    --header-height: 60px;
}

.content {
    width: calc(100% - var(--sidebar-width));
    height: calc(100vh - var(--header-height));
}
```

浏览器兼容性：

- IE 9+支持
- 现代浏览器完全支持
- 移动端浏览器支持良好

---
