# 30. 什么是“工具类型”（Utility Types）？请举例。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 工具类型是 TypeScript 内置的一些泛型类型，用于帮助我们进行常见的类型转换。

- Partial&lt;T&gt;: 将 T 的所有属性变为可选。
- Readonly&lt;T&gt;: 将 T 的所有属性变为只读。
- Pick&lt;T, K&gt;: 从 T 中选择一组属性 K 来构造一个新的类型。
- Omit&lt;T, K&gt;: 从 T 中移除一组属性 K 来构造一个新的类型。
- Record&lt;K, T&gt;: 构造一个对象类型，其属性键为 K，属性值为 T。
