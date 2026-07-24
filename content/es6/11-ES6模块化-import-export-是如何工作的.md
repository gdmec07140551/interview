# 11. ES6模块化（import/export）是如何工作的？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

ES6提供了原生的模块化支持：

```javascript
// 导出
export const name = 'John';
export function greet() {}
export default class Person {}

// 导入
import Person, { name, greet } from './module.js';
import * as utils from './utils.js';
```

- 静态导入导出
- 编译时确定依赖关系
- 支持默认导出和命名导出
- 自动严格模式
