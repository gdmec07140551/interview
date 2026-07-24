# 48. 什么是 Variance（变体）？它对函数类型有什么影响？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: Variance 描述了类型构造器如何处理子类型关系，主要有协变、逆变和双变。对于函数类型 (arg: A) =&gt; B，它的参数类型 A 是逆变的（允许更通用的类型），而返回值类型 B 是协变的（允许更具体的类型）。默认情况下，TypeScript 的函数参数是双变的（Bivariant），但可以通过开启 strictFunctionTypes 选项使其变为更安全的逆变。
