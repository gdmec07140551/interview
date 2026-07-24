# 7. 什么是剩余参数（rest parameters）？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

剩余参数使用...语法，将多个参数收集到一个数组中：

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // numbers = [1, 2, 3, 4]
```

剩余参数必须是最后一个参数，一个函数只能有一个剩余参数。
