# 14. 什么是生成器函数（Generator）？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

生成器函数是可以暂停和恢复执行的函数，使用function*定义：

```javascript
function* generator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = generator();
gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: 3, done: true}
```

特点：

- 返回迭代器对象
- 可以暂停和恢复执行
- 用于实现异步编程
- 可以双向通信
