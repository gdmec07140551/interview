# 1. 说说你对 TypeScript 中命名空间与模块的理解？区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

- 模块（Modules）:

TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。模块有自己的作用域，模块中定义的变量、函数、类等在外部是不可见的，除非使用 export 导出。相反，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的。模块是组织代码的首选方式，尤其是在大型应用中。

- 命名空间（Namespaces）:

命名空间是 TypeScript 早期的模块化方案，现在主要用于组织全局变量，避免命名冲突。它通过 namespace 关键字定义，可以包含变量、函数、类和接口等。命名空间可以跨多个文件，并且可以使用 /// &lt;reference path="..." /&gt; 指令来引用。在现代 TypeScript 开发中，推荐使用 ES 模块替代命名空间。

- 区别:

  - 作用域: 模块是文件级别的作用域，而命名空间是全局作用域下的一个对象。
  - 依赖管理: 模块通过 import/export 显式声明依赖，而命名空间通常需要通过 &lt;reference&gt; 标签或打包工具来管理文件顺序。
  - 生态系统: ES 模块是 JavaScript 的标准，拥有更广泛的社区支持和工具链兼容性。
  - 推荐使用: 在新项目中，应优先使用模块。命名空间主要用于维护旧项目或在特殊场景下组织全局变量。

---
