# 27. TypeScript 的严格空检查 (strictNullChecks) 是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 这是一个编译器选项。当它被启用时，null 和 undefined 值将不能赋值给其他类型的变量，除非显式地使用联合类型（如 string | null）。这可以帮助开发者在编译阶段就发现潜在的 null 或 undefined 错误。
