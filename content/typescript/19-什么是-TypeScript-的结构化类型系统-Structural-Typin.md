# 19. 什么是 TypeScript 的结构化类型系统（Structural Typing）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: TypeScript 的类型系统是结构化的（也称为“鸭子类型”）。这意味着如果两个类型具有相同的结构（属性和方法），那么它们就是兼容的，而不管它们的名称是什么。只要一个对象满足了某个接口的结构要求，它就被认为是该接口的类型。

20. T | null 和 T & null 分别是什么意思？

参考答案:

- T | null: 联合类型（Union Type）。表示一个值可以是 T 类型，也可以是 null。
- T & null: 交叉类型（Intersection Type）。通常结果是 null，因为一个类型不能同时是 T 和 null（除非 T 是 any 或 unknown）。交叉类型用于合并多个类型的成员。
