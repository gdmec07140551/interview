# 31. TypeScript 源码是如何编译成 JavaScript 的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: TypeScript 编译器 (TSC) 会解析 .ts 文件，进行类型检查，然后将 TypeScript 语法（如类型注解、接口、泛型等）擦除，并根据 tsconfig.json 中的 target 选项将 ESNext 语法（如类、箭头函数）转换为目标版本的 JavaScript 代码。
