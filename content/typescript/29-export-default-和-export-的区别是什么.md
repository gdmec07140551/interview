# 29. export default 和 export 的区别是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

- export: 可以导出多个命名成员（变量、函数、类）。导入时需要使用花括号 {} 并且名称必须匹配，例如 import { a, b } from './module';。
- export default: 每个模块只能有一个默认导出。导入时不需要花括号，并且可以任意命名，例如 import myModule from './module';。
