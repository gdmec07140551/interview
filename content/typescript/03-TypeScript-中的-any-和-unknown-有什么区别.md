# 3. TypeScript 中的 any 和 unknown 有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

any 和 unknown 都代表任意类型，但 unknown 是 any 的类型安全版本。

- any:

  - 表示任意类型，TypeScript 编译器会对其完全放弃类型检查。
  - 可以对 any 类型的变量进行任何操作，包括属性访问、函数调用等，这在编译时都不会报错，但可能在运行时出错。
  - any 类型的变量可以赋值给任何其他类型的变量。
  - any 会在类型系统中“传播”，任何与之交互的值都会“被污染”成 any 类型。

- unknown:

  - 表示一个未知的类型，是所有类型的父类型。
  - 不能对 unknown 类型的变量进行任何操作（除了赋值给 any 或 unknown 类型），除非通过类型断言、类型收窄（如 typeof、instanceof 判断）来明确其具体类型。
  - unknown 类型的变量只能赋值给 any 或 unknown 类型的变量。

- 总结: unknown 强制开发者在执行操作前进行类型检查，从而保证了代码的类型安全，应在不确定类型时优先使用 unknown 而非 any。

---
