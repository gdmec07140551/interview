# 13. CSS盒模型是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

盒模型组成：

CSS盒模型由内容（content）、内边距（padding）、边框（border）、外边距（margin）四部分组成。

两种盒模型：

1. 标准盒模型（content-box）：

- 宽度 = 内容宽度
- 总宽度 = width + padding + border + margin

2. IE盒模型（border-box）：

- 宽度 = 内容宽度 + padding + border
- 总宽度 = width + margin

box-sizing属性：

```css
/* 标准盒模型 */
.standard {
    box-sizing: content-box;
}

/* IE盒模型 */
.border-box {
    box-sizing: border-box;
}
```

示例：

```css
.box {
    width: 200px;
    padding: 20px;
    border: 5px solid #000;
    margin: 10px;
}

/* content-box: 总宽度 = 200 + 40 + 10 + 20 = 270px */
/* border-box: 总宽度 = 200 + 20 = 220px */
```

最佳实践：

```css
* {
    box-sizing: border-box;
}
```

---
