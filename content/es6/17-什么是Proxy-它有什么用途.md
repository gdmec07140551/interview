# 17. 什么是Proxy？它有什么用途？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

Proxy用于定义基本操作的自定义行为（如属性查找、赋值等）：

```javascript
const proxy = new Proxy(target, handler);
```

用途：

- 属性访问拦截
- 函数调用拦截
- 数据验证
- 属性默认值
- 实现观察者模式
- Vue3的响应式原理

常用handler方法：get、set、has、deleteProperty等。
