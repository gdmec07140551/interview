# 10. ES6的类（Class）是如何工作的？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

ES6的类是基于原型的语法糖：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  sayHello() {
    return `Hello, I'm ${this.name}`;
  }
  
  static getSpecies() {
    return 'Homo sapiens';
  }
}
```

- constructor定义构造函数
- 方法定义在原型上
- 支持静态方法
- 支持继承（extends）
