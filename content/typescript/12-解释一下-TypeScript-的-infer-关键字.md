# 12. 解释一下 TypeScript 的 infer 关键字。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: infer 关键字出现在条件类型 (extends) 的 true 分支中，用于声明一个类型变量，并从正在匹配的类型中推断出这个变量的类型。它常用于获取函数参数类型、返回值类型、Promise 的 resolve 类型等。
