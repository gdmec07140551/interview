# 43. TypeScript 支持 CommonJS 和 ES Modules 吗？如何配置？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 支持。可以在 tsconfig.json 的 compilerOptions 中通过 module 字段来配置。设置为 "commonjs" 会编译成 CommonJS 模块（使用 require/module.exports），设置为 "esnext" 或 "es2020" 等会编译成 ES 模块（使用 import/export）。
