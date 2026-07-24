# 问题 5：请解释装饰器模式（Decorator Pattern），它在现代前端框架中有什么应用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

装饰器模式是一种结构型设计模式，它允许在不修改原始对象代码的情况下，动态地为对象添加新的功能或行为。它通过创建一个包装器（wrapper）对象来实现，该包装器持有对原始对象的引用。

在现代前端框架中的应用：

- React 中的高阶组件 (HOC - Higher-Order Components)： HOC 本质上就是装饰器模式的一种实现。它是一个函数，接受一个组件作为参数，并返回一个新的增强版组件。例如，React Router 的 withRouter 就是一个 HOC，它将路由相关的 props (match, location, history) 注入到被包裹的组件中。
- Angular 和 TypeScript 中的装饰器： Angular 大量使用 TypeScript 的装饰器语法（@Component, @Injectable, @Input 等）。这些装饰器在编译时为类、属性或方法附加元数据或修改其行为，例如 @Component 装饰器将一个普通类标记为 Angular 组件，并为其提供模板、样式等元数据。

---
