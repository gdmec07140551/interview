# 20. 解释什么是预处理器？常见的CSS预处理器有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

预处理器是一种工具，它可以让你使用特殊的语法来生成CSS。

CSS预处理器的优势：

- 变量：定义可重用的值
- 嵌套：层级化的样式编写
- 混合（Mixin）：可重用的样式块
- 函数：动态生成样式
- 模块化：@import功能增强

常见的CSS预处理器：

Sass/SCSS：

```scss
$primary-color: #333;
$margin: 16px;

.header {
  color: $primary-color;
  margin: $margin;
  
  &:hover {
    color: lighten($primary-color, 20%);
  }
}
```

Less：

```plain text
@primary-color: #333;
@margin: 16px;

.header {
  color: @primary-color;
  margin: @margin;
  
  &:hover {
    color: lighten(@primary-color, 20%);
  }
}
```

Stylus：

```plain text
primary-color = #333
margin = 16px

.header
  color primary-color
  margin margin
  
  &:hover
    color lighten(primary-color, 20%)
```
