# 9. TypeScript 中的 enum（枚举）是什么？它和 const enum 的区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

enum（枚举）是 TypeScript 中用于定义一组命名常量的数据结构。它有助于提高代码的可读性和可维护性，通过名字而不是魔术数字来表示一组固定的值。

- enum:

  - 默认情况下，枚举是基于数字的，第一个成员默认为 0，其余成员依次递增。也可以手动设置成员的值。
  - 枚举成员也可以是字符串。
  - TypeScript 会为数字枚举生成一个反向映射（Reverse Mapping），即可以从枚举名得到值，也可以从值得到枚举名。
  - 编译后会生成一个真实存在的 JavaScript 对象。

- const enum:

  - 常量枚举使用 const 关键字修饰。
  - 它在编译后会被完全移除，所有使用到枚举成员的地方都会被直接替换为对应的内联值。
  - 它不能有计算成员。
  - 这样做的好处是可以减少编译后的代码体积，提升性能。

- 区别总结:

  - 编译结果: enum 编译成一个 JavaScript 对象，const enum 则被完全抹除，成员被内联。
  - 反向映射: const enum 不支持反向映射。
  - 性能: const enum 的性能更好，因为它避免了额外的对象查找和属性访问。

---
