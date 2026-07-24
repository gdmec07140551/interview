# 8. 什么是 TypeScript 的装饰器（Decorators）？它有什么应用场景？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

装饰器是一种特殊的声明，它可以附加到类声明、方法、访问器、属性或参数上。装饰器使用 @expression 的形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为其参数。

装饰器是 ES7 的一个提案，TypeScript 较早地提供了实验性支持。

- 应用场景:

  1. AOP（面向切面编程）: 在不修改原有代码的情况下，为类或方法添加额外的行为，如日志记录、性能监控、事务处理等。
  2. 元数据编程: 配合 reflect-metadata 库，可以为类和属性附加元数据，用于依赖注入（DI）容器（如 Angular, NestJS）、ORM（如 TypeORM）等。
  3. 代码转换/增强: 自动绑定 this、定义 Web 框架的路由、验证模型属性等。

- 注意: 要使用装饰器，需要在 tsconfig.json 中开启 experimentalDecorators 和 emitDecoratorMetadata 选项。

---
