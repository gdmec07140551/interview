# 6. 什么是 TypeScript 的类型断言（Type Assertion）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

类型断言是一种向编译器提供有关我们比它更了解某个值的类型信息的方式。它类似于其他语言中的类型转换，但它不会进行任何运行时的特殊检查或数据重构。它只在编译阶段起作用，并且假设开发者已经进行了必要的检查。

- 语法:

  1. 尖括号语法: &lt;Type&gt;value
  2. as 语法**: value as Type (在 JSX/TSX 中，只能使用 as 语法，以避免与 JSX 标签混淆，因此 as 是更推荐的写法)。

- 示例:

  ```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

- 注意: 类型断言不应滥用。如果可以，应优先使用类型守卫（Type Guards）等更安全的类型收窄方法。断言错误可能导致运行时错误。

---
