# 13. 什么是映射类型（Mapped Types）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 映射类型是一种泛型类型，它使用一个已知的类型，并根据其属性来创建一个新的类型。它通过 in keyof 语法遍历一个类型的键，并为新类型的每个键定义类型。常用于创建只读、可选或部分类型的变体。
