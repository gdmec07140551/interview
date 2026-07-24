# 47. 如何在 TypeScript 项目中引入一个没有类型定义的 npm 包？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

1. 首先尝试在 @types 组织下安装它的声明文件，例如 npm install @types/package-name。
2. 如果不存在，可以在项目中创建一个全局的 .d.ts 文件（如 global.d.ts），然后使用 declare module 'package-name'; 来声明这个模块，这样 TypeScript 至少不会报错，但会将其类型视为 any。
3. 为了更好的类型安全，可以在声明模块内部为其关键的 API 添加类型定义。
