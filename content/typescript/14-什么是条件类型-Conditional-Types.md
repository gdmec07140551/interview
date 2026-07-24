# 14. 什么是条件类型（Conditional Types）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 条件类型是 TypeScript 中一种根据条件选择两种类型之一的类型。它的形式是 T extends U ? X : Y。如果 T 可以赋值给 U，则结果是 X 类型，否则是 Y 类型。它使得类型可以进行类似三元运算符的逻辑判断。
