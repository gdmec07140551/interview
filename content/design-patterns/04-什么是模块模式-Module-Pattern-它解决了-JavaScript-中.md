# 问题 4：什么是模块模式（Module Pattern）？它解决了 JavaScript 中的什么问题？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

模块模式是一种利用闭包（Closure）来创建私有作用域和公有接口的设计模式。它允许你封装变量和函数，只暴露需要对外访问的部分。

它主要解决了 JavaScript 中的两个问题：

1. 全局作用域污染： 在模块模式出现之前，大量的变量和函数都定义在全局作用域中，容易导致命名冲突和代码难以维护。模块模式将代码封装在函数作用域内，避免了这个问题。
2. 缺乏私有变量： JavaScript 在ES6之前没有原生的私有属性概念。通过闭包，模块模式可以模拟出私有变量（定义在立即执行函数IIFE内部，但不返回）和公有方法（作为返回对象的方法）。

示例代码：

```javascript
const MyModule = (function() {
    let privateVariable = '我是私有的';

    function privateMethod() {
        console.log(privateVariable);
    }

    return {
        publicMethod: function() {
            privateMethod();
        }
    };
})();

MyModule.publicMethod(); // 输出: "我是私有的"
// console.log(MyModule.privateVariable); // undefined，无法访问
```

---
