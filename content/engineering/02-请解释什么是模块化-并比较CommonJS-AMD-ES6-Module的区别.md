# 2. 请解释什么是模块化，并比较CommonJS、AMD、ES6 Module的区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

模块化是将复杂程序按照功能拆分成独立模块的设计思想。

CommonJS（Node.js）：

- 同步加载，适用于服务端
- 使用 require() 导入，module.exports 导出
- 运行时加载，加载的是对象

AMD（RequireJS）：

- 异步加载，适用于浏览器
- 使用 define() 定义模块，require() 加载
- 依赖前置，预先加载依赖

ES6 Module：

- 编译时确定依赖关系
- 使用 import/export 语法
- 静态分析，支持 Tree Shaking
- 异步加载，但语法是同步的
