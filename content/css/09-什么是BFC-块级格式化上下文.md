# 9. 什么是BFC（块级格式化上下文）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

BFC定义：

Block Formatting Context，块级格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域。

BFC的特性：

1. 内部的Box会在垂直方向一个接一个地放置
2. Box垂直方向的距离由margin决定，同一个BFC的相邻Box的margin会发生重叠
3. BFC的区域不会与float box重叠
4. BFC是页面上的一个隔离的独立容器
5. 计算BFC的高度时，浮动元素也参与计算

触发BFC的条件：

- 根元素（html）
- float属性不为none
- position为absolute或fixed
- display为inline-block、table-cell、table-caption、flex、inline-flex
- overflow不为visible

BFC的应用：

1. 解决margin重叠：

```css
.bfc {
    overflow: hidden; /* 创建BFC */
}
```

2. 清除浮动：

```css
.clearfix {
    overflow: hidden; /* 包含浮动子元素 */
}
```

3. 防止文字环绕：

```css
.sidebar {
    float: left;
    width: 200px;
}
.content {
    overflow: hidden; /* 创建BFC，不与浮动元素重叠 */
}
```

---
