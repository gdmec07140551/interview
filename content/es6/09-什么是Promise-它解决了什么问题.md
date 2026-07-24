# 9. 什么是Promise？它解决了什么问题？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

Promise是处理异步操作的对象，有三种状态：pending、fulfilled、rejected。

解决的问题：

- 回调地狱问题
- 错误处理困难
- 异步操作的组合和串联
- 提供了更好的异步编程模式

基本用法：

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
});
promise.then(result => {}).catch(error => {});
```
