# 15. 什么是迭代器（Iterator）和可迭代对象？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

迭代器：实现了next()方法的对象，返回{value, done}格式的结果。

可迭代对象：实现了Symbol.iterator方法的对象。

内置可迭代对象：Array、String、Map、Set、arguments等。

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
iterator.next(); // {value: 1, done: false}
```
