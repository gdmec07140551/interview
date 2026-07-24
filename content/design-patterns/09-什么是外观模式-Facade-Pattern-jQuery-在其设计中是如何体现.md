# 问题 9：什么是外观模式（Facade Pattern）？jQuery 在其设计中是如何体现外观模式的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

外观模式是一种结构型设计模式，它为一组复杂的子系统提供一个简化的、统一的接口。它隐藏了系统的复杂性，并向客户端提供一个可以轻松访问的接口。

jQuery 的体现：

jQuery 是外观模式的完美典范。它极大地简化了复杂的原生 DOM API、事件处理和 Ajax 请求。

- DOM 操作： 原生 JavaScript 获取元素并修改内容可能需要 document.getElementById('myId').innerHTML = 'hello'，而 jQuery 提供了简洁的 $('#myId').html('hello')。$ 函数本身就是一个外观，它背后封装了元素选择、解析等一系列复杂操作。
- Ajax 请求： 原生 XMLHttpRequest 的使用非常繁琐，需要处理多个步骤和状态。jQuery 的 $.ajax()、$.get()、$.post() 方法提供了一个极其简单的接口，隐藏了底层的实现细节，开发者只需传入配置对象即可完成一个异步请求。

通过提供这些简洁的 API，jQuery 充当了一个“外观”，让开发者可以轻松地与浏览器底层复杂的子系统进行交互。

---
