# 7. 解释一下 TypeScript 中的 declare 关键字。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

declare 关键字用于向 TypeScript 编译器“声明”一个在其他地方（如另一个 JavaScript 文件、浏览器环境或 Node.js 环境）已经存在的变量、函数、类或模块。

它的主要作用是让 TypeScript 知道这些实体的存在及其类型，从而在编译时能够进行类型检查，而不会因为找不到定义而报错。declare 只包含类型定义，不包含具体的实现。

- 常见用途:
  1. 声明全局变量: declare const $: any; (声明一个全局的 jQuery 对象)
  2. 声明模块: declare module 'some-js-library'; (为没有 TypeScript 类型定义的 JavaScript 库提供一个基本的模块声明)
  3. 声明文件 (.d.ts)**: 在声明文件中，declare 被广泛用于描述现有 JavaScript 代码的类型结构。

---
