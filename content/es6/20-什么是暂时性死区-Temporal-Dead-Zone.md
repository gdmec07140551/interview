# 20. 什么是暂时性死区（Temporal Dead Zone）？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

暂时性死区是指let和const声明的变量在声明之前不能被访问的区域。

```javascript
console.log(a); // ReferenceError
let a = 1;

function func() {
  console.log(b); // ReferenceError
  let b = 2;
}
```

特点：

- 从块级作用域开始到变量声明之前
- 访问会抛出ReferenceError
- typeof操作符也会报错
- 确保变量先声明后使用
