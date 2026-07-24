# 34. TypeScript 如何处理函数重载？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 在 TypeScript 中，可以为同一个函数提供多个函数类型定义（重载签名），然后紧跟一个通用的实现签名。编译器在调用函数时，会根据传入的参数类型从上到下匹配最合适的重载签名进行类型检查。
