# 18. CSS中的伪类和伪元素有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

伪类（Pseudo-classes）：

用于选择处于特定状态的元素，以单冒号:表示。

常用伪类：

```css
/* 链接状态 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* 结构伪类 */
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(2n) { background: #f0f0f0; }
li:nth-child(odd) { background: white; }

/* 状态伪类 */
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked + label { color: green; }

/* 否定伪类 */
p:not(.special) { color: gray; }
```

伪元素（Pseudo-elements）：

用于创建和样式化不存在于HTML中的元素，以双冒号::表示（CSS3规范，但单冒号也兼容）。

常用伪元素：

```css
/* 首字母和首行 */
p::first-letter {
    font-size: 2em;
    float: left;
}

p::first-line {
    font-weight: bold;
}

/* 前后插入内容 */
.quote::before {
    content: """;
    font-size: 2em;
}

.quote::after {
    content: """;
    font-size: 2em;
}

/* 选中文本 */
::selection {
    background: yellow;
    color: black;
}

/* 占位符 */
input::placeholder {
    color: #999;
    font-style: italic;
}
```

主要区别：

1. 概念：伪类选择存在的元素的特定状态，伪元素创建虚拟元素
2. 语法：伪类用单冒号，伪元素用双冒号（CSS3）
3. 数量：一个元素可以有多个伪类，但只能有一个::before和一个::after
4. DOM：伪类不创建新元素，伪元素创建虚拟元素

---
