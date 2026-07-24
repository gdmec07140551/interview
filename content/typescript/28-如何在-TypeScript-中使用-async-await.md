# 28. 如何在 TypeScript 中使用 async/await？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: TypeScript 完全支持 async/await。一个 async 函数的返回值总是被包装在一个 Promise 中。await 关键字只能在 async 函数内部使用，用于等待一个 Promise 解析并返回其结果。TypeScript 会对 Promise 的 resolve 值进行类型推断和检查。
