# 18. 什么是Reflect？它与Proxy有什么关系？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

Reflect是一个内置对象，提供了拦截JavaScript操作的方法。

特点：

- 方法与Proxy handler方法一一对应
- 提供了默认的对象操作行为
- 返回值更合理（布尔值而不是抛出异常）

```javascript
// 传统方式
delete obj.prop;

// Reflect方式
Reflect.deleteProperty(obj, 'prop'); // 返回boolean
```

与Proxy配合使用可以实现更好的元编程。
