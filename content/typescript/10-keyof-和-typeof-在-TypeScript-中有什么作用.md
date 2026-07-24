# 10. keyof 和 typeof 在 TypeScript 中有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

keyof 和 typeof 是 TypeScript 中用于类型操作的两个重要操作符。

- keyof (索引类型查询操作符)**:

  - 它接收一个对象类型，并返回该类型所有公共属性名组成的联合类型（string literal union type）。
  - 示例:

    ```typescript
interface Person {
    name: string;
    age: number;
}
type PersonKeys = keyof Person; // "name" | "age"
```

- typeof (类型查询操作符)**:

  - 在类型上下文中（即 type 别名或泛型约束等地方），typeof 用于获取一个变量或属性的类型。
  - 它与 JavaScript 中的 typeof 运算符不同，JavaScript 的 typeof 在运行时返回值的字符串表示（如 "string", "number"），而 TypeScript 的 typeof 在编译时获取类型信息。
  - 示例:

    ```typescript
const person = { name: "Alice", age: 30 };
type PersonType = typeof person; // { name: string; age: number; }
```
