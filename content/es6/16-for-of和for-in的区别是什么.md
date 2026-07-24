# 16. for...of和for...in的区别是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

- for...in：遍历对象的可枚举属性名（包括继承的）
- for...of：遍历可迭代对象的值

```javascript
const arr = [1, 2, 3];
arr.name = 'array';

for (let key in arr) {
  console.log(key); // 0, 1, 2, name
}

for (let value of arr) {
  console.log(value); // 1, 2, 3
}
```
