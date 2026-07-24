# 23. TypeScript 是如何进行类型推断的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 当我们没有显式指定类型时，TypeScript 编译器会根据上下文自动推断出变量、函数返回值等的类型。例如，let x = 10; TypeScript 会推断 x 的类型为 number。它也会根据函数体的 return 语句推断函数的返回类型。
