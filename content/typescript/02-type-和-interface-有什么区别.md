# 2. type 和 interface 有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

type (类型别名) 和 interface (接口) 都可以用来定义对象或函数的类型，但在功能上存在一些差异。

- 相同点:

  - 都可以描述对象的形状或函数签名。
  - 都支持继承，interface 使用 extends，type 使用交叉类型 &。

- 不同点:

  - 扩展性: interface 可以重复声明并会自动合并（Declaration Merging），这使得扩展第三方库的接口变得容易。而 type 不支持重复声明。
  - 实现: 类可以 implements 一个 interface 或 type，但 interface 只能 extends 另一个 interface。
  - 原始类型: type 可以为原始类型（如 string, number）、联合类型、元组等创建别名，而 interface 主要用于描述对象的结构。
  - 计算属性: type 可以使用 typeof、keyof 等操作符创建更复杂的类型，而 interface 不支持。

- 选择建议:

  - 当定义公共 API 或希望对象结构可被扩展时，优先使用 interface。
  - 当需要定义联合类型、元组或处理复杂的类型运算时，使用 type。

---
