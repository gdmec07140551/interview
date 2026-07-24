# 30. 什么是Object.assign()？它有什么特点和用途？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

Object.assign()用于将源对象的可枚举属性复制到目标对象：

```javascript
const target = {a: 1};
const source = {b: 2, c: 3};
Object.assign(target, source); // {a: 1, b: 2, c: 3}
```

特点：

- 浅拷贝，不会拷贝继承属性和不可枚举属性
- 同名属性会被覆盖
- 返回目标对象
- 可以接受多个源对象

用途：

- 对象合并
- 对象克隆
- 为对象添加属性
- 为对象添加方法
