# 4. CSS Grid网格布局的基本概念和使用方法？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

基本概念：

- Grid是二维布局系统，可以同时处理行和列
- 由网格容器（Grid Container）和网格项目（Grid Items）组成
- 通过网格线（Grid Lines）划分网格轨道（Grid Tracks）

容器属性：

```css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr; /* 列的定义 */
    grid-template-rows: 100px 200px; /* 行的定义 */
    grid-gap: 10px; /* 网格间距 */
    grid-template-areas: /* 区域命名 */
        "header header header"
        "sidebar content content";
}
```

项目属性：

```css
.grid-item {
    grid-column: 1 / 3; /* 占据列1到列3 */
    grid-row: 1 / 2; /* 占据行1到行2 */
    grid-area: header; /* 指定区域 */
}
```

兼容性：

- 现代浏览器支持良好
- IE 10+部分支持，需要使用-ms-前缀

---
