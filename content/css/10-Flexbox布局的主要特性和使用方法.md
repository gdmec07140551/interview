# 10. Flexbox布局的主要特性和使用方法？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

基本概念：

- 主轴（main axis）和交叉轴（cross axis）
- 容器（flex container）和项目（flex items）
- 一维布局系统，主要处理一个方向上的布局

容器属性：

```css
.flex-container {
    display: flex;
    flex-direction: row | column; /* 主轴方向 */
    flex-wrap: nowrap | wrap; /* 是否换行 */
    justify-content: flex-start | center | space-between; /* 主轴对齐 */
    align-items: stretch | center | flex-start; /* 交叉轴对齐 */
    align-content: stretch | center; /* 多行对齐 */
}
```

项目属性：

```css
.flex-item {
    flex-grow: 1; /* 放大比例 */
    flex-shrink: 1; /* 缩小比例 */
    flex-basis: auto; /* 基础大小 */
    flex: 1; /* flex-grow, flex-shrink, flex-basis的简写 */
    align-self: auto | center; /* 单独的对齐方式 */
    order: 0; /* 排列顺序 */
}
```

常用布局模式：

1. 水平垂直居中：

```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

2. 等分布局：

```css
.equal {
    display: flex;
}
.equal > div {
    flex: 1;
}
```

3. 固定侧边栏：

```css
.layout {
    display: flex;
}
.sidebar {
    flex: 0 0 200px;
}
.content {
    flex: 1;
}
```

---
