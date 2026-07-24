# 4. 什么是 TypeScript 中的泛型（Generics）？它有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

泛型（Generics）是一种在定义函数、类或接口时不预先指定具体类型，而在使用时再指定类型的一种特性。它允许我们编写可重用的、类型安全的代码。

- 作用:

  1. 代码重用: 泛型允许我们编写一个可以处理多种数据类型的组件（函数、类等），而不需要为每种类型都重写一遍代码。例如，一个 identity 函数可以接收任何类型的参数并返回相同类型的值。
  2. 类型安全: 泛型在提供灵活性的同时，保持了严格的类型检查。它能在编译时捕获类型错误，而不是在运行时。例如，一个泛型集合类，在创建实例时指定其元素类型，之后添加或获取元素时，编译器都会检查类型是否匹配。
  3. 抽象和封装: 泛型可以帮助我们创建更通用的抽象，隐藏具体实现的类型细节。

- 示例:

  ```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString"); // 类型为 string
let output2 = identity(100); // 类型被推断为 number
```

---
