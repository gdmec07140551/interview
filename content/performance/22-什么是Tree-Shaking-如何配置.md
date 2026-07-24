# 22. 什么是Tree Shaking？如何配置？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

Tree Shaking是移除JavaScript中未使用代码的优化技术，基于ES6模块的静态结构。

工作原理：

- 分析模块依赖关系
- 标记使用的代码
- 移除未使用的代码

配置示例：

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false, // 标记包为无副作用
  },
};

// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.js"
  ]
}

// 正确的导入方式
import { debounce } from 'lodash-es'; // 支持tree shaking
// 避免
import _ from 'lodash'; // 导入整个库
```
