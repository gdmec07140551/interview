# 45. 什么是 .tsbuildinfo 文件？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: .tsbuildinfo 文件是 TypeScript 在启用增量编译（--incremental 或 composite: true）时生成的文件。它存储了上次编译的构建信息，使得下一次编译时，编译器可以只重新编译发生变化的文件及其依赖，从而大大加快编译速度。
